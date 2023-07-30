package com.ssafy.bium.gameroom.service;

import com.ssafy.bium.gameroom.GameRoom;
import com.ssafy.bium.gameroom.UserGameRoom;
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

@Service
@RequiredArgsConstructor
public class GameRoomServiceImpl implements GameRoomService {
//    private final GameRoomRepository gameRoomRepository;
    private final RedisTemplate<String, GameRoom> redisTemplate;
//    private final HashOperations<String, Long, GameRoom> hashOperations;

//    @Override
//    public GameRoomListDto searchGameRoom(SearchGameRoomDto request) {
//
//        return redisTemplate.opsForValue().get(id).getTitle();
//
////        Optional<GameRoom> gameRoom = gameRoomRepository.findById(id);
////        if (!gameRoom.isPresent()) {
////            return "NO";
////        }
////        return gameRoom.get().getGameRoomTitle();
//    }

    @Override
    public Long createGameRoom(GameRoomDto gameRoomDto) {
        RedisAtomicLong counter = new RedisAtomicLong("gri", redisTemplate.getConnectionFactory());
        Long generatedId = counter.incrementAndGet();
        GameRoom gameRoom = GameRoom.builder()
                .gameRoomId(generatedId)
                .gameRoomTitle(gameRoomDto.getTitle())
                .isStart(false)
                .gameRoomPw(gameRoomDto.getPw())
                .gameRoomMovie(gameRoomDto.getMovie())
                .curPeople(1)
                .maxPeople(gameRoomDto.getMaxPeople())
                .build();
        redisTemplate.opsForHash().put("gr", String.valueOf(generatedId), gameRoom);
        return generatedId;

    }

    @Override
    public Long enterGameRoom(Long GameRoomId) {
        RedisAtomicLong counter = new RedisAtomicLong("ugri", redisTemplate.getConnectionFactory());
        Long generatedId = counter.incrementAndGet();
        UserGameRoom userGameRoom = UserGameRoom.builder()
                .detailGameRoomId(generatedId)
                .gameRoomId(GameRoomId)
                .user_id(1L)
                .isHost(true)
                .sequence(1)
                .gameRecord(0L)
                .build();
        redisTemplate.opsForHash().put("ugr", String.valueOf(generatedId), userGameRoom);
        return generatedId;
    }
}
