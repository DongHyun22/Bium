package com.ssafy.bium.gameroom.service;

import com.ssafy.bium.common.exception.ExceptionMessage;
import com.ssafy.bium.common.exception.PasswordException;
import com.ssafy.bium.gameroom.GameRoom;
import com.ssafy.bium.gameroom.Game;
import com.ssafy.bium.gameroom.repository.GameRoomRepository;
import com.ssafy.bium.gameroom.repository.GameRepository;
import com.ssafy.bium.gameroom.request.*;
import com.ssafy.bium.gameroom.response.DetailGameRoomDto;
import com.ssafy.bium.gameroom.response.EnterUserDto;
import com.ssafy.bium.gameroom.response.GameRoomListDto;
import com.ssafy.bium.gameroom.response.UserGameRecordDto;
import com.ssafy.bium.openvidu.OpenviduService;
import com.ssafy.bium.user.User;
import com.ssafy.bium.user.repository.UserRepository;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.redis.support.atomic.RedisAtomicLong;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

import static com.ssafy.bium.common.exception.ExceptionMessage.NOT_MATCHING_PASSWORD;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameRoomServiceImpl implements GameRoomService {
    private final GameRoomRepository gameRoomRepository;
    private final GameRepository userGameRoomRepository;
    private final RedisTemplate<String, String> gameRoomNum;
    private final RedisTemplate<String, GameRoom> redisTemplate;
    private final OpenviduService openviduService;
    private final UserRepository userRepository;

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
                        gameRoom.getStart(),
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
        Long gameRoomIndex = counterGR.get();
        boolean host = false;
        
        if(gameRoomDto.getCustomSessionId().isEmpty()){
            gameRoomIndex = counterGR.incrementAndGet();
            sessionId = "gameRoom" + gameRoomIndex;
            params.put("customSessionId", sessionId);
            openviduService.initializeSession(params);
            GameRoom gameRoom = GameRoom.builder()
                    .gameRoomId(String.valueOf(gameRoomIndex))
                    .gameRoomTitle(gameRoomDto.getGameRoomTitle())
                    .start("false")
                    .gameRoomPw(gameRoomDto.getGameRoomPw())
                    .gameRoomMovie(gameRoomDto.getGameRoomMovie())
                    .curPeople(0)
                    .startPeople(0)
                    .maxPeople(gameRoomDto.getMaxPeople())
                    .customSessionId(sessionId)
                    .build();
            gameRoomRepository.save(gameRoom).getCustomSessionId();
            host = true;
        }
        else{
            sessionId = gameRoomDto.getCustomSessionId();
        }
        EnterGameRoomDto enterGameRoomDto = EnterGameRoomDto.builder()
                .gameRoomId(String.valueOf(gameRoomIndex))
                .gameRoomPw(gameRoomDto.getGameRoomPw())
                .customSessionId(sessionId)
                .host(host)
                .build();
        return enterGameRoomDto;
    }

//    @Transactional 왜 적용이 안되지?
    @Override
    public EnterUserDto enterGameRoom(EnterGameRoomDto enterGameRoomDto, String userEmail) throws OpenViduJavaClientException, OpenViduHttpException {
        String gameRoomId = enterGameRoomDto.getGameRoomId();
        String gameRoomPw = enterGameRoomDto.getGameRoomPw();
        String roomPw = (String) redisTemplate.opsForHash().get("gameRoom:" + gameRoomId, "gameRoomPw");
        if(!gameRoomPw.equals(roomPw)){
            throw new PasswordException(NOT_MATCHING_PASSWORD);
        }

        // 유저게임방에 참가자 생성
        RedisAtomicLong counterUGR = new RedisAtomicLong("gameIndex", redisTemplate.getConnectionFactory());
        Long gameIndex = counterUGR.incrementAndGet();
        
        Map<String, Object> params = new HashMap<>();
        params.put("customSessionId", enterGameRoomDto.getCustomSessionId());
        String sessionId = openviduService.createConnection(enterGameRoomDto.getCustomSessionId(), params);

        int cur = Integer.parseInt((String) redisTemplate.opsForHash().get("gameRoom:" + gameRoomId, "curPeople"));
        redisTemplate.opsForHash().put("gameRoom:" + gameRoomId, "curPeople", String.valueOf(++cur));

        Game game = Game.builder()
                .gameId(String.valueOf(gameIndex))
                .gameRoomId(String.valueOf(gameRoomId))
                .userEmail(userEmail)
                .host(enterGameRoomDto.isHost())
                .sequence(cur)
                .gameRecord(0L)
                .build();
        userGameRoomRepository.save(game);
        // 비밀번호

        EnterUserDto enterUserDto = EnterUserDto.builder()
                .sessionId(sessionId)
                .gameId(String.valueOf(gameIndex))
                .host(enterGameRoomDto.isHost())
                .build();
        return enterUserDto;
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
                .start("false")
                .gameRoomPw(request.getGameRoomPw())
                .gameRoomMovie(request.getGameRoomMovie())
                .curPeople(cur)
                .startPeople(0)
                .maxPeople(request.getMaxPeople())
                .build();
        return gameRoomRepository.save(gameRoom).getGameRoomId();
    }

    @Override
    public String outGameRoom(String gameId) {
        String gameRoomId = (String) redisTemplate.opsForHash().get("game:" + gameId, "gameRoomId");
        String start = (String) redisTemplate.opsForHash().get("gameRoom:" + gameRoomId, "start");
        if (start.equals("false")) {
            redisTemplate.delete("game:" + gameId);
            redisTemplate.opsForSet().remove("game", Integer.parseInt(gameId));
            int cur = Integer.parseInt((String) redisTemplate.opsForHash().get("gameRoom:" + gameRoomId, "curPeople"));
            redisTemplate.opsForHash().put("gameRoom:" + gameRoomId, "curPeople", String.valueOf(--cur));
        }
//        RedisAtomicLong counterUGR = new RedisAtomicLong("ugri", redisTemplate.getConnectionFactory());
//        counterUGR.decrementAndGet();
        return gameRoomId;
    }

    @Override
    public String startGameRoom(String gameRoomId) {
        String start = (String) redisTemplate.opsForHash().get("gameRoom:" + gameRoomId, "start");
        if(start.equals("false")){
            start = "true";
        }
        String startPeople = (String) redisTemplate.opsForHash().get("gameRoom:" + gameRoomId, "curPeople");

        redisTemplate.opsForHash().put("gameRoom:" + gameRoomId, "start", start);
        redisTemplate.opsForHash().put("gameRoom:" + gameRoomId, "startPeople", startPeople);
        return gameRoomId;
    }

    @Override
    public List<UserGameRecordDto> overGame(OverGameDto request) {
        HashOperations<String, String, String> hash = redisTemplate.opsForHash();
        SetOperations<String, String> set = gameRoomNum.opsForSet();

        String gameId = request.getGameId();
        String gameRoomId = (String) hash.get("game:" + gameId, "gameRoomId");
        String userEmail = (String) hash.get("game:" + gameId, "userEmail");
        Optional<User> findUser = userRepository.findByUserEmail(userEmail);
        if(findUser.isEmpty()){
            log.debug("{} - 해당 유저는 존재하지 않습니다.", userEmail);
            return null;
        }
        findUser.get().saveBium(request.getGameRecord());
        userRepository.save(findUser.get());
        // 비움량 저장
        hash.put("game:" + gameId, "gameRecord", String.valueOf(request.getGameRecord()));

        int survivor = Integer.parseInt((String) hash.get("gameRoom:" + gameRoomId, "startPeople"));
        hash.put("gameRoom:" + gameRoomId, "startPeople", String.valueOf(--survivor));
        if(survivor == 0){
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
        return null;
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
    public List<UserGameRecordDto> StopGameRoom(String gameRoomId) {
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
