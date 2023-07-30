package com.ssafy.bium.gameroom.service;

import com.ssafy.bium.gameroom.GameRoom;
import com.ssafy.bium.gameroom.request.GameRoomDto;
import com.ssafy.bium.gameroom.request.SearchGameRoomDto;
import com.ssafy.bium.gameroom.response.GameRoomListDto;
import org.springframework.data.domain.PageRequest;

public interface GameRoomService {
//    GameRoomListDto searchGameRoom(SearchGameRoomDto request);
    Long createGameRoom(GameRoomDto gameRoomDto);
    Long enterGameRoom(Long gameRoomId);
}
