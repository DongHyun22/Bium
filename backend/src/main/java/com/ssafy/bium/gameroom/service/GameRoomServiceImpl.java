package com.ssafy.bium.gameroom.service;

import com.ssafy.bium.gameroom.request.SearchGameRoomDto;
import com.ssafy.bium.gameroom.response.GameRoomListDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GameRoomServiceImpl implements GameRoomService {
//    private final GameRoomRepository gameRoomRepository;
    private final RedisTemplate<String, SearchGameRoomDto> redisTemplate;

    @Override
    public GameRoomListDto searchGameRoom(SearchGameRoomDto request) {

        return redisTemplate.opsForValue().get(id).getTitle();

//        Optional<GameRoom> gameRoom = gameRoomRepository.findById(id);
//        if (!gameRoom.isPresent()) {
//            return "NO";
//        }
//        return gameRoom.get().getGameRoomTitle();
    }

    @Override
    public String createGameRoom(SearchGameRoomDto searchGameRoomDto) {
        redisTemplate.opsForValue().set(searchGameRoomDto.getId(), searchGameRoomDto);
//        return gameRoomRepository.save(gameRoomDto.getId(), gameRoomDto);
        return searchGameRoomDto.getId();
    }
}
