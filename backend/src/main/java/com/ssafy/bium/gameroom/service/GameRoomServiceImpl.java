package com.ssafy.bium.gameroom.service;

import com.ssafy.bium.gameroom.GameRoom;
import com.ssafy.bium.gameroom.UserGameRoom;
import com.ssafy.bium.gameroom.repository.GameRoomRepository;
import com.ssafy.bium.gameroom.repository.UserGameRoomRepository;
import com.ssafy.bium.gameroom.request.EnterGameRoomDto;
import com.ssafy.bium.gameroom.request.GameRoomDto;
import com.ssafy.bium.gameroom.request.SearchGameRoomDto;
import com.ssafy.bium.gameroom.response.GameRoomListDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.support.atomic.RedisAtomicLong;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GameRoomServiceImpl implements GameRoomService {
    private final GameRoomRepository gameRoomRepository;
    private final UserGameRoomRepository usergameRoomRepository;
    private final RedisTemplate<String, GameRoom> redisTemplate;
//    private final HashOperations<String, String, GameRoom> hashOperations;

    @Override
    public List<GameRoomListDto> searchGameRoom(SearchGameRoomDto request) {
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
    public Long createGameRoom(GameRoomDto gameRoomDto, String userEmail) {
        RedisAtomicLong counterGR = new RedisAtomicLong("gri", redisTemplate.getConnectionFactory());
        Long gri = counterGR.incrementAndGet();
        GameRoom gameRoom = GameRoom.builder()
                .gameRoomId(String.valueOf(gri))
                .gameRoomTitle(gameRoomDto.getTitle())
                .start(false)
                .gameRoomPw(gameRoomDto.getPw())
                .gameRoomMovie(gameRoomDto.getMovie())
                .curPeople(1)
                .maxPeople(gameRoomDto.getMaxPeople())
                .build();
        gameRoomRepository.save(gameRoom).getGameRoomId();

        RedisAtomicLong counterUGR = new RedisAtomicLong("ugri", redisTemplate.getConnectionFactory());
        Long ugri = counterUGR.incrementAndGet();
        UserGameRoom userGameRoom = UserGameRoom.builder()
                .userGameRoomId(String.valueOf(ugri))
                .gameRoomId(String.valueOf(gri))
                .userEmail(userEmail)
                .isHost(true)
                .sequence(1)
                .gameRecord(0L)
                .build();
        usergameRoomRepository.save(userGameRoom);
//        redisTemplate.opsForHash().put("gr", String.valueOf(generatedId), gameRoom);
        return ugri;
    }

    @Override
    public Long enterGameRoom(EnterGameRoomDto enterGameRoomDto) {
        String gameRoomId = enterGameRoomDto.getGameRoomId();
        // 게임방의 max인원이 꽉차면 입장 불가, 게임방이 진행중(start)이면 입장 불가, pw가 다르면 입장 불가
        int cur = Integer.parseInt((String) redisTemplate.opsForHash().get("gameRoom:" + gameRoomId, "curPeople"));
//        GameRoom gameRoom = gameRoomRepository.findGameRoomByGameRoomId("5");
        // 게임방의 현재 인원 1 증가
        redisTemplate.opsForHash().put("gameRoom:" + enterGameRoomDto.getGameRoomId(), "curPeople", String.valueOf(++cur));
        // 유저게임방에 참가자 생성
        RedisAtomicLong counterUGR = new RedisAtomicLong("ugri", redisTemplate.getConnectionFactory());
        Long ugri = counterUGR.incrementAndGet();
        UserGameRoom userGameRoom = UserGameRoom.builder()
                .userGameRoomId(String.valueOf(ugri))
                .gameRoomId(String.valueOf(gameRoomId))
                .userEmail(enterGameRoomDto.getUserEmail())
                .isHost(false)
                .sequence(cur)
                .gameRecord(0L)
                .build();
        usergameRoomRepository.save(userGameRoom);
        return null;
    }
}
