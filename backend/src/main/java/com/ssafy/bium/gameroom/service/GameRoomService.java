package com.ssafy.bium.gameroom.service;

import com.ssafy.bium.gameroom.request.*;
import com.ssafy.bium.gameroom.response.DetailGameRoomDto;
import com.ssafy.bium.gameroom.response.GameRoomListDto;

import java.util.List;

public interface GameRoomService {
    List<GameRoomListDto> searchGameRooms(SearchGameRoomDto request);
    Long createGameRoom(GameRoomDto gameRoomDto, String userEmail);
    String enterGameRoom(EnterGameRoomDto enterGameRoomDto);
    DetailGameRoomDto searchGameRoom(String gameRoomId);
    String modifyGameRoom(ModifyGameRoomDto request);
    String outGameRoom(String userGameRoomId);
    String startGameRoom(String gameRoomId);
    String overUserGameRoom(OverUserGameRoomDto request);
    String deleteGameRoom(String gameRoomId);
}
