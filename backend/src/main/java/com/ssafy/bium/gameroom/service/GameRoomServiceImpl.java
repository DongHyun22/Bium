package com.ssafy.bium.gameroom.service;

import com.ssafy.bium.gameroom.GameRoom;
import com.ssafy.bium.gameroom.UserGameRoom;
import com.ssafy.bium.gameroom.repository.GameRoomRepository;
import com.ssafy.bium.gameroom.repository.UserGameRoomRepository;
import com.ssafy.bium.gameroom.request.*;
import com.ssafy.bium.gameroom.response.DetailGameRoomDto;
import com.ssafy.bium.gameroom.response.GameRoomListDto;
import com.ssafy.bium.openvidu.OpenviduService;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.support.atomic.RedisAtomicLong;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GameRoomServiceImpl implements GameRoomService {
    private final GameRoomRepository gameRoomRepository;
    private final UserGameRoomRepository usergameRoomRepository;
    private final RedisTemplate<String, GameRoom> redisTemplate;
    private final OpenviduService openviduService;
//    private final HashOperations<String, String, GameRoom> hashOperations;

    @Override
    public List<GameRoomListDto> searchGameRooms(SearchGameRoomDto request) {
        // TODO: 2023-07-30 (030) paging, sort 구현
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
        // 방 정보가 없으면 실행
        // 해쉬에서 찾기
        // TODO: 2023-08-02 (002) 세션이 열려있으면 방 생성 불가하게 처리
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
        // gameRoomId에 해당하는 userGameRoom 삭제
//        System.out.println(redisTemplate.opsForHash().entries("userGameRoom"));
        Optional<GameRoom> findGameRoom = gameRoomRepository.findById(gameRoomId);
        if(!findGameRoom.isPresent())
            return "0";
        // 다 삭제하면 gameRoomId의 gameRoom 삭제
        return findGameRoom.get().getGameRoomTitle();
    }


}
