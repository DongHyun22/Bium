package com.ssafy.bium.gameroom.service;

import com.ssafy.bium.gameroom.GameRoom;
import com.ssafy.bium.gameroom.UserGameRoom;
import com.ssafy.bium.gameroom.repository.GameRoomRepository;
import com.ssafy.bium.gameroom.repository.UserGameRoomRepository;
import com.ssafy.bium.gameroom.request.*;
import com.ssafy.bium.gameroom.response.DetailGameRoomDto;
import com.ssafy.bium.gameroom.response.GameRoomListDto;
import com.ssafy.bium.gameroom.response.UserGameRecordDto;
import com.ssafy.bium.openvidu.OpenviduService;
import com.ssafy.bium.user.User;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.redis.support.atomic.RedisAtomicLong;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GameRoomServiceImpl implements GameRoomService {
    private final GameRoomRepository gameRoomRepository;
    private final UserGameRoomRepository usergameRoomRepository;
    private final RedisTemplate<String, String> gameRoomNum;
    private final RedisTemplate<String, GameRoom> redisTemplate;
    private final OpenviduService openviduService;

    @Override
    public List<GameRoomListDto> searchGameRooms(SearchGameRoomDto request) {
        // TODO: 2023-07-30 (030) paging, sort 구현
//        Sort sort = Sort.by(Sort.Direction.ASC, )
        List<GameRoom> gameRooms = gameRoomRepository.findAll();

        return gameRooms.stream()
                .map(gameRoom -> new GameRoomListDto(
                        gameRoom.getGameRoomTitle(),
                        gameRoom.isStart(),
                        gameRoom.getGameRoomMovie(),
                        gameRoom.getCurPeople(),
                        gameRoom.getMaxPeople()))
                .collect(Collectors.toList());
    }

    @Override
    public String createGameRoom(GameRoomDto gameRoomDto, String userEmail) throws OpenViduJavaClientException, OpenViduHttpException {
        RedisAtomicLong counterGR = new RedisAtomicLong("gri", redisTemplate.getConnectionFactory());
        Long gri = counterGR.incrementAndGet();
        Map<String, Object> params = new HashMap<>();
        params.put("customSessionId", gameRoomDto.getCustomSessionId());
        String sessionId = openviduService.initializeSession(params);

        GameRoom gameRoom = GameRoom.builder()
                .gameRoomId(String.valueOf(gri))
                .gameRoomTitle(gameRoomDto.getTitle())
                .start(false)
                .gameRoomPw(gameRoomDto.getPw())
                .gameRoomMovie(gameRoomDto.getMovie())
                .curPeople(1)
                .maxPeople(gameRoomDto.getMaxPeople())
                .customSessionId(gameRoomDto.getCustomSessionId())
                .build();
        gameRoomRepository.save(gameRoom).getCustomSessionId();

//        RedisAtomicLong counterUGR = new RedisAtomicLong("ugri", redisTemplate.getConnectionFactory());
//        Long ugri = counterUGR.incrementAndGet();
//        UserGameRoom userGameRoom = UserGameRoom.builder()
//                .userGameRoomId(String.valueOf(ugri))
//                .gameRoomId(String.valueOf(gri))
//                .userEmail(userEmail)
//                .isHost(true)
//                .sequence(1)
//                .gameRecord(0L)
//                .build();
//        usergameRoomRepository.save(userGameRoom);
////        redisTemplate.opsForHash().put("gr", String.valueOf(generatedId), gameRoom);
        return sessionId;
    }

    @Override
    public String enterGameRoom(EnterGameRoomDto enterGameRoomDto, String userEmail) throws OpenViduJavaClientException, OpenViduHttpException {
            String gameRoomId = enterGameRoomDto.getGameRoomId();
            // 게임방의 max인원이 꽉차면 입장 불가, 게임방이 진행중(start)이면 입장 불가, pw가 다르면 입장 불가
            int cur = Integer.parseInt((String) redisTemplate.opsForHash().get("gameRoom:" + gameRoomId, "curPeople"));
//        GameRoom gameRoom = gameRoomRepository.findGameRoomByGameRoomId("5");
            // 게임방의 현재 인원 1 증가
            redisTemplate.opsForHash().put("gameRoom:" + gameRoomId, "curPeople", String.valueOf(++cur));
            // 유저게임방에 참가자 생성
            RedisAtomicLong counterUGR = new RedisAtomicLong("ugri", redisTemplate.getConnectionFactory());
            Long ugri = counterUGR.incrementAndGet();
            Map<String, Object> params = new HashMap<>();
            params.put("customSessionId", enterGameRoomDto.getCustomSessionId());
            String sessionId = openviduService.createConnection(enterGameRoomDto.getCustomSessionId(), params);
            UserGameRoom userGameRoom = UserGameRoom.builder()
                .userGameRoomId(String.valueOf(ugri))
                .gameRoomId(String.valueOf(gameRoomId))
                .userEmail(userEmail)
                .isHost(false)
                .sequence(cur)
                .gameRecord(0L)
                .build();
        usergameRoomRepository.save(userGameRoom);
        return sessionId;
        // 입장한 사람의 정보를 뿌려줘야되네

    }

    @Override
    public DetailGameRoomDto searchGameRoom(String gameRoomId) {
        // 해당 gameRoomId에 해당하는 방 정보를 ModifyDto에 저장하여 리턴
        String title = (String) redisTemplate.opsForHash().get("gameRoom:" + gameRoomId, "gameRoomTitle");
        int gameRoomMovie = Integer.parseInt((String) redisTemplate.opsForHash().get("gameRoom:" + gameRoomId, "gameRoomMovie"));
        int max = Integer.parseInt((String) redisTemplate.opsForHash().get("gameRoom:" + gameRoomId, "maxPeople"));
        String gameRoomPw = (String) redisTemplate.opsForHash().get("gameRoom:" + gameRoomId, "gameRoomPw");
        DetailGameRoomDto modifyGameRoomDto = DetailGameRoomDto.builder()
                .title(title)
                .gameRoomMovie(gameRoomMovie)
                .maxPeople(max)
                .gameRoomPw(gameRoomPw)
                .build();
        return modifyGameRoomDto;
    }

    @Override
    public String modifyGameRoom(ModifyGameRoomDto request) {
        int cur = Integer.parseInt((String) redisTemplate.opsForHash().get("gameRoom:" + request.getGameRoomId(), "curPeople"));
        GameRoom gameRoom = GameRoom.builder()
                .gameRoomId(request.getGameRoomId())
                .gameRoomTitle(request.getTitle())
                .start(false)
                .gameRoomPw(request.getGameRoomPw())
                .gameRoomMovie(request.getGameRoomMovie())
                .curPeople(cur)
                .maxPeople(request.getMaxPeople())
                .build();
        return gameRoomRepository.save(gameRoom).getGameRoomId();
    }

    @Override
    public String outGameRoom(String userGameRoomId) {
        String gameRoomId = (String) redisTemplate.opsForHash().get("userGameRoom:" + userGameRoomId, "gameRoomId");
        String temp = (String) redisTemplate.opsForHash().get("gameRoom:"+gameRoomId, "start");
        boolean start = Boolean.parseBoolean(temp);
        if(!start){
            redisTemplate.delete("userGameRoom:" + userGameRoomId);
            redisTemplate.opsForSet().remove("userGameRoom", Integer.parseInt(userGameRoomId));
        }

//        RedisAtomicLong counterUGR = new RedisAtomicLong("ugri", redisTemplate.getConnectionFactory());
//        counterUGR.decrementAndGet();
        return gameRoomId;
    }

    @Override
    public String startGameRoom(String gameRoomId) {
        String temp = (String) redisTemplate.opsForHash().get("gameRoom:"+gameRoomId, "start");
        boolean start = !(Boolean.parseBoolean(temp));
        redisTemplate.opsForHash().put("gameRoom:"+gameRoomId, "start", String.valueOf(start));
        return gameRoomId;
    }

    @Override
    public String overUserGameRoom(OverUserGameRoomDto request) {
        redisTemplate.opsForHash().put("userGameRoom:"+request.getUserGameRoomId(), "gameRecord", String.valueOf(request.getRecord()));
        return request.getUserGameRoomId();
    }

    @Override
    public String deleteGameRoom(String gameRoomId) {
        HashOperations<String, String, String> hash = redisTemplate.opsForHash();
        SetOperations<String, String> set = gameRoomNum.opsForSet();
        Set<String> userGameRoomNum = set.members("userGameRoom");
        for(String s : userGameRoomNum){
            // 게임에 접속되어있는 유저들 중에서 받아온 게임방아이디에 있는 유저들 찾기 -> scan 같은 빠른 메서드 찾기
            if(Objects.equals(hash.get("userGameRoom:" + s, "gameRoomId"), gameRoomId)){
                redisTemplate.delete("userGameRoom:" + s);
                redisTemplate.opsForSet().remove("userGameRoom", Integer.parseInt(s));
            }
        }
        redisTemplate.delete("gameRoom:" + gameRoomId);
        redisTemplate.opsForSet().remove("GameRoom", Integer.parseInt(gameRoomId));
//
//        String hashKey = "customSessionId"; // 여기에 해당 키에 대한 해시 키 값을 지정하세요.
//
//        String value = hash.get("gameRoom:"+gameRoomId, hashKey);
//        System.out.println(value);
//        System.out.println(value.equals("SessionA"));
        // gameRoomId에 해당하는 userGameRoom 삭제
//        System.out.println(redisTemplate.opsForHash().entries("userGameRoom"));
//        Optional<GameRoom> findGameRoom = g           ameRoomRepository.findById(gameRoomId);
//        if(!findGameRoom.isPresent())
//            return "0";
        // 다 삭제하면 gameRoomId의 gameRoom 삭제

        return null;
    }

    @Override
    public List<UserGameRecordDto> RecordGameRoom(String gameRoomId) {
        HashOperations<String, String, String> hash = redisTemplate.opsForHash();
        SetOperations<String, String> set = gameRoomNum.opsForSet();
        Set<String> userGameRoomNum = set.members("userGameRoom");
        List<UserGameRecordDto> userGameRecords = new ArrayList<>();
        for(String s : userGameRoomNum){
            // 게임에 접속되어있는 유저들 중에서 받아온 게임방아이디에 있는 유저들 찾기 -> scan 같은 빠른 메서드 찾기
            if(Objects.equals(hash.get("userGameRoom:" + s, "gameRoomId"), gameRoomId)){
                UserGameRecordDto userGameRecordDto = UserGameRecordDto.builder()
                        .userEmail(hash.get("userGameRoom:" + s, "userEmail"))
                        // TODO: 2023-08-03 (003) 유저 이메일 대신 유저 닉네임 넣기 
                        .gameRecord(hash.get("userGameRoom:" + s, "gameRecord"))
                        .build();
                userGameRecords.add(userGameRecordDto);
            }
        }
        Collections.sort(userGameRecords, new Comparator<>() {
            @Override
            public int compare(UserGameRecordDto o1, UserGameRecordDto o2) {
                long value1 = Long.parseLong(o1.getGameRecord());
                long value2 = Long.parseLong(o2.getGameRecord());
                return Long.compare(value2, value1);
            }
        });
        return userGameRecords;
    }


}
