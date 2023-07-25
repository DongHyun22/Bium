package com.ssafy.bium.gameroom.service;

import com.ssafy.bium.gameroom.request.GameRoomDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GameRoomServiceImpl implements GameRoomService {
//    private final GameRoomRepository gameRoomRepository;
    private final RedisTemplate<String, GameRoomDto> redisTemplate;

    @Override
    public String searchGameRoom(int sort, String keyword, int page, String id) {
        return redisTemplate.opsForValue().get(id).getTitle();

//        Optional<GameRoom> gameRoom = gameRoomRepository.findById(id);
//        if (!gameRoom.isPresent()) {
//            return "NO";
//        }
//        return gameRoom.get().getGameRoomTitle();
    }

    @Override
    public String createGameRoom(GameRoomDto gameRoomDto) {
        redisTemplate.opsForValue().set(gameRoomDto.getId(), gameRoomDto);
//        return gameRoomRepository.save(gameRoomDto.getId(), gameRoomDto);
        return gameRoomDto.getId();
    }
}
