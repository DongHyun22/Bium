package com.ssafy.bium.gameroom.service;

import com.ssafy.bium.gameroom.GameRoom;
import com.ssafy.bium.gameroom.Game;
import com.ssafy.bium.gameroom.repository.GameRoomRepository;
import com.ssafy.bium.gameroom.repository.GameRepository;
import com.ssafy.bium.gameroom.request.*;
import com.ssafy.bium.gameroom.response.DetailGameRoomDto;
import com.ssafy.bium.gameroom.response.GameRoomListDto;
import com.ssafy.bium.gameroom.response.UserGameRecordDto;
import com.ssafy.bium.openvidu.OpenviduService;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.redis.support.atomic.RedisAtomicLong;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GameRoomServiceImpl implements GameRoomService {
    private final GameRoomRepository gameRoomRepository;
    private final GameRepository userGameRoomRepository;
    private final RedisTemplate<String, String> gameRoomNum;
    private final RedisTemplate<String, GameRoom> redisTemplate;
    private final OpenviduService openviduService;

    @Override
    public String test(String sessionId) throws OpenViduJavaClientException, OpenViduHttpException {
        openviduService.getData(sessionId);
        return "";
    }

    @Override
    public List<GameRoomListDto> searchGameRooms() {
        List<GameRoom> gameRooms = gameRoomRepository.findAll();

        return gameRooms.stream()
                .map(gameRoom -> new GameRoomListDto(
                        gameRoom.getCustomSessionId(),
                        gameRoom.getGameRoomTitle(),
                        gameRoom.isStart(),
                        gameRoom.getGameRoomMovie(),
                        gameRoom.getCurPeople(),
                        gameRoom.getMaxPeople()))
                .collect(Collectors.toList());
    }

    @Override
    public EnterGameRoomDto createGameRoom(GameRoomDto gameRoomDto, String userEmail) throws OpenViduJavaClientException, OpenViduHttpException {
        // sessionId 구분!
        RedisAtomicLong counterGR = new RedisAtomicLong("gameRoomIndex", redisTemplate.getConnectionFactory());
        Map<String, Object> params = new HashMap<>();
        String sessionId;
        Long gri = counterGR.get();
        
        if(gameRoomDto.getCustomSessionId().isEmpty()){
            gri = counterGR.incrementAndGet();
            sessionId = "gameRoom" + gri;
            params.put("customSessionId", sessionId);
            openviduService.initializeSession(params);
            GameRoom gameRoom = GameRoom.builder()
                    .gameRoomId(String.valueOf(gri))
                    .gameRoomTitle(gameRoomDto.getGameRoomTitle())
                    .start(false)
                    .gameRoomPw(gameRoomDto.getGameRoomPw())
                    .gameRoomMovie(gameRoomDto.getGameRoomMovie())
                    .curPeople(1)
                    .maxPeople(gameRoomDto.getMaxPeople())
                    .customSessionId(sessionId)
                    .build();
            gameRoomRepository.save(gameRoom).getCustomSessionId();
        }
        else{
            sessionId = gameRoomDto.getCustomSessionId();
        }
        EnterGameRoomDto enterGameRoomDto = EnterGameRoomDto.builder()
                .gameRoomId(String.valueOf(gri))
                .gameRoomPw(gameRoomDto.getGameRoomPw())
                .customSessionId(sessionId)
                .build();
        return enterGameRoomDto;
    }

    @Override
    public String enterGameRoom(EnterGameRoomDto enterGameRoomDto, String userEmail) throws OpenViduJavaClientException, OpenViduHttpException {
        String gameRoomId = enterGameRoomDto.getGameRoomId();
        // TODO: 2023-08-04 패스워드에 맞춰서 입장
        // TODO: 2023-08-06 (006) cur인원, 진행중 여부는 openvidu에서 설정 할 수 있을 것 같아요 
        // 게임방의 max인원이 꽉차면 입장 불가, 게임방이 진행중(start)이면 입장 불가, pw가 다르면 입장 불가
        int cur = Integer.parseInt((String) redisTemplate.opsForHash().get("gameRoom:" + gameRoomId, "curPeople"));
//        GameRoom gameRoom = gameRoomRepository.findGameRoomByGameRoomId("5");
        // 게임방의 현재 인원 1 증가
        redisTemplate.opsForHash().put("gameRoom:" + gameRoomId, "curPeople", String.valueOf(++cur));
        // 유저게임방에 참가자 생성
        RedisAtomicLong counterUGR = new RedisAtomicLong("gi", redisTemplate.getConnectionFactory());
        Long ugri = counterUGR.incrementAndGet();
        
        Map<String, Object> params = new HashMap<>();
        params.put("customSessionId", enterGameRoomDto.getCustomSessionId());
        String sessionId = openviduService.createConnection(enterGameRoomDto.getCustomSessionId(), params);
        System.out.println(sessionId);
        Game game = Game.builder()
                .gameId(String.valueOf(ugri))
                .gameRoomId(String.valueOf(gameRoomId))
                .userEmail(userEmail)
                .isHost(false)
                .sequence(cur)
                .gameRecord(0L)
                .build();
        userGameRoomRepository.save(game);
        // 비밀번호

        return sessionId;
        // 입장한 사람의 정보를 뿌려줘야되네
    }

    @Override
    public DetailGameRoomDto searchGameRoom(String gameRoomId) {
        // 해당 gameRoomId에 해당하는 방 정보를 ModifyDto에 저장하여 리턴
        Optional<GameRoom> findGameRoom = gameRoomRepository.findById(gameRoomId);
        if (!findGameRoom.isPresent())
            return null;
        GameRoom gameRoom = findGameRoom.get();
        DetailGameRoomDto modifyGameRoomDto = DetailGameRoomDto.builder()
                .gameRoomTitle(gameRoom.getGameRoomTitle())
                .gameRoomMovie(gameRoom.getGameRoomMovie())
                .maxPeople(gameRoom.getMaxPeople())
                .gameRoomPw(gameRoom.getGameRoomPw())
                .build();
        return modifyGameRoomDto;
    }

    @Override
    public String modifyGameRoom(ModifyGameRoomDto request) {
        int cur = Integer.parseInt((String) redisTemplate.opsForHash().get("gameRoom:" + request.getGameRoomId(), "curPeople"));
        GameRoom gameRoom = GameRoom.builder()
                .gameRoomId(request.getGameRoomId())
                .gameRoomTitle(request.getGameRoomTitle())
                .start(false)
                .gameRoomPw(request.getGameRoomPw())
                .gameRoomMovie(request.getGameRoomMovie())
                .curPeople(cur)
                .maxPeople(request.getMaxPeople())
                .build();
        return gameRoomRepository.save(gameRoom).getGameRoomId();
    }

    @Override
    public String outGameRoom(String gameId) {
        String gameRoomId = (String) redisTemplate.opsForHash().get("game:" + gameId, "gameRoomId");
        String temp = (String) redisTemplate.opsForHash().get("gameRoom:" + gameRoomId, "start");
        boolean start = Boolean.parseBoolean(temp);
        if (!start) {
            redisTemplate.delete("game:" + gameId);
            redisTemplate.opsForSet().remove("game", Integer.parseInt(gameId));
        }
//        RedisAtomicLong counterUGR = new RedisAtomicLong("ugri", redisTemplate.getConnectionFactory());
//        counterUGR.decrementAndGet();
        return gameRoomId;
    }

    @Override
    public String startGameRoom(String gameRoomId) {
        String temp = (String) redisTemplate.opsForHash().get("gameRoom:" + gameRoomId, "start");
        boolean start = !(Boolean.parseBoolean(temp));
        redisTemplate.opsForHash().put("gameRoom:" + gameRoomId, "start", String.valueOf(start));
        return gameRoomId;
    }

    @Override
    public String overGame(OverGameDto request) {
        redisTemplate.opsForHash().put("game:" + request.getGameId(), "gameRecord", String.valueOf(request.getGameRecord()));
        return request.getGameId();
    }

    @Override
    public String deleteGameRoom(String gameRoomId) {
        HashOperations<String, String, String> hash = redisTemplate.opsForHash();
        SetOperations<String, String> set = gameRoomNum.opsForSet();
        Set<String> gameNum = set.members("game");
        for (String s : gameNum) {
            // 게임에 접속되어있는 유저들 중에서 받아온 게임방아이디에 있는 유저들 찾기 -> scan 같은 빠른 메서드 찾기
            if (Objects.equals(hash.get("game:" + s, "gameRoomId"), gameRoomId)) {
                redisTemplate.delete("game:" + s);
                redisTemplate.opsForSet().remove("game", Integer.parseInt(s));
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
        // gameRoomId에 해당하는 game 삭제
//        System.out.println(redisTemplate.opsForHash().entries("game"));
//        Optional<GameRoom> findGameRoom = gameRoomRepository.findById(gameRoomId);
//        if(!findGameRoom.isPresent())
//            return "0";
        // 다 삭제하면 gameRoomId의 gameRoom 삭제

        return null;
    }

    @Override
    public List<UserGameRecordDto> RecordGameRoom(String gameRoomId) {
        HashOperations<String, String, String> hash = redisTemplate.opsForHash();
        SetOperations<String, String> set = gameRoomNum.opsForSet();
        Set<String> gameNum = set.members("game");
        List<UserGameRecordDto> userGameRecords = new ArrayList<>();
        for(String s : gameNum){
            // 게임에 접속되어있는 유저들 중에서 받아온 게임방아이디에 있는 유저들 찾기 -> scan 같은 빠른 메서드 찾기
            if(Objects.equals(hash.get("game:" + s, "gameRoomId"), gameRoomId)){
                UserGameRecordDto userGameRecordDto = UserGameRecordDto.builder()
                        .userEmail(hash.get("game:" + s, "userEmail"))
                        // TODO: 2023-08-03 (003) 유저 이메일 대신 유저 닉네임 넣기 
                        .gameRecord(hash.get("game:" + s, "gameRecord"))
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
