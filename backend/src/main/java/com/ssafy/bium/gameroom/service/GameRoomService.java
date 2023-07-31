package com.ssafy.bium.gameroom.service;

import com.ssafy.bium.gameroom.request.EnterGameRoomDto;
import com.ssafy.bium.gameroom.request.GameRoomDto;
import com.ssafy.bium.gameroom.request.ModifyGameRoomDto;
import com.ssafy.bium.gameroom.response.DetailGameRoomDto;
import com.ssafy.bium.gameroom.request.SearchGameRoomDto;
import com.ssafy.bium.gameroom.response.GameRoomListDto;

import java.util.List;

public interface GameRoomService {
    List<GameRoomListDto> searchGameRooms(SearchGameRoomDto request);
    Long createGameRoom(GameRoomDto gameRoomDto, String userEmail);
    Long enterGameRoom(EnterGameRoomDto enterGameRoomDto);
    DetailGameRoomDto searchGameRoom(String gameRoomId);
    Long modifyGameRoom(ModifyGameRoomDto request);
    Long outGameRoom(String userGameRoomId);
}
