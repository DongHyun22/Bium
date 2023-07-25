package com.ssafy.bium.gameroom.service;

import com.ssafy.bium.gameroom.request.GameRoomDto;

public interface GameRoomService {
    String searchGameRoom(int sort, String keyword, int page, String id);
    String createGameRoom(GameRoomDto gameRoomDto);
}
