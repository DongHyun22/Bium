package com.ssafy.bium.gameroom.service;

import com.ssafy.bium.gameroom.request.SearchGameRoomDto;
import com.ssafy.bium.gameroom.response.GameRoomListDto;
import org.springframework.data.domain.PageRequest;

public interface GameRoomService {
    GameRoomListDto searchGameRoom(SearchGameRoomDto request);
    String createGameRoom(SearchGameRoomDto searchGameRoomDto);
}
