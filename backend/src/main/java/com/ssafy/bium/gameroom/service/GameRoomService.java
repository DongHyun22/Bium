package com.ssafy.bium.gameroom.service;

import com.ssafy.bium.gameroom.GameRoom;
import com.ssafy.bium.gameroom.request.EnterGameRoomDto;
import com.ssafy.bium.gameroom.request.GameRoomDto;
import com.ssafy.bium.gameroom.request.ModifyGameRoomDto;
import com.ssafy.bium.gameroom.request.SearchGameRoomDto;
import com.ssafy.bium.gameroom.response.GameRoomListDto;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface GameRoomService {
    List<GameRoomListDto> searchGameRooms(SearchGameRoomDto request);
    Long createGameRoom(GameRoomDto gameRoomDto, String userEmail);
    Long enterGameRoom(EnterGameRoomDto enterGameRoomDto);
    ModifyGameRoomDto searchGameRoom(String gameRoomId);
}
