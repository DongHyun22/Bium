package com.ssafy.bium.gameroom.service;

import com.ssafy.bium.gameroom.request.*;
import com.ssafy.bium.gameroom.response.DetailGameRoomDto;
import com.ssafy.bium.gameroom.response.GameRoomListDto;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;

import java.util.List;

public interface GameRoomService {
    List<GameRoomListDto> searchGameRooms(SearchGameRoomDto request);
    String createGameRoom(GameRoomDto gameRoomDto, String userEmail) throws OpenViduJavaClientException, OpenViduHttpException;
    String enterGameRoom(EnterGameRoomDto enterGameRoomDto, String userEmail) throws OpenViduJavaClientException, OpenViduHttpException;
    DetailGameRoomDto searchGameRoom(String gameRoomId);
    String modifyGameRoom(ModifyGameRoomDto request);
    String outGameRoom(String userGameRoomId);
    String startGameRoom(String gameRoomId);
    String overUserGameRoom(OverUserGameRoomDto request);
    String deleteGameRoom(String gameRoomId);
}
