package com.ssafy.bium.gameroom.service;

import com.ssafy.bium.gameroom.request.SearchGameRoomDto;
import org.springframework.data.domain.PageRequest;

public interface GameRoomService {
    String searchGameRoom(SearchGameRoomDto request, PageRequest pageRequest);
    String createGameRoom(SearchGameRoomDto searchGameRoomDto);
}
