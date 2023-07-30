package com.ssafy.bium.gameroom.service;

import com.ssafy.bium.gameroom.GameRoom;
import com.ssafy.bium.gameroom.UserGameRoom;
import com.ssafy.bium.gameroom.repository.GameRoomRepository;
import com.ssafy.bium.gameroom.repository.UserGameRoomRepository;
import com.ssafy.bium.gameroom.request.GameRoomDto;
import com.ssafy.bium.gameroom.request.SearchGameRoomDto;
import com.ssafy.bium.gameroom.response.GameRoomListDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.support.atomic.RedisAtomicLong;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GameRoomServiceImpl implements GameRoomService {
    private final GameRoomRepository gameRoomRepository;
    private final UserGameRoomRepository usergameRoomRepository;
    private final RedisTemplate<String, GameRoom> redisTemplate;
//    private final HashOperations<String, Long, GameRoom> hashOperations;

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
    public Long createGameRoom(GameRoomDto gameRoomDto) {
        RedisAtomicLong counter = new RedisAtomicLong("gri", redisTemplate.getConnectionFactory());
        Long generatedId = counter.incrementAndGet();
        GameRoom gameRoom = GameRoom.builder()
                .gameRoomId(generatedId)
                .gameRoomTitle(gameRoomDto.getTitle())
                .start(false)
                .gameRoomPw(gameRoomDto.getPw())
                .gameRoomMovie(gameRoomDto.getMovie())
                .curPeople(1)
                .maxPeople(gameRoomDto.getMaxPeople())
                .build();

//        redisTemplate.opsForHash().put("gr", String.valueOf(generatedId), gameRoom);
        return gameRoomRepository.save(gameRoom).getGameRoomId();

    }

    @Override
    public Long enterGameRoom(Long GameRoomId, String userEmail) {
        RedisAtomicLong counter = new RedisAtomicLong("ugri", redisTemplate.getConnectionFactory());
        Long generatedId = counter.incrementAndGet();
        UserGameRoom userGameRoom = UserGameRoom.builder()
                .detailGameRoomId(generatedId)
                .gameRoomId(GameRoomId)
                .userEmail(userEmail)
                .isHost(true)
                .sequence(1)
                .gameRecord(0L)
                .build();
        usergameRoomRepository.save(userGameRoom);
//        redisTemplate.opsForHash().put("ugr", String.valueOf(generatedId), userGameRoom);
        return generatedId;
    }
}
