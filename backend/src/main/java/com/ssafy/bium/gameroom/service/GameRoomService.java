package com.ssafy.bium.gameroom.service;

import com.ssafy.bium.gameroom.request.*;
import com.ssafy.bium.gameroom.response.DetailGameRoomDto;
import com.ssafy.bium.gameroom.response.EnterUserDto;
import com.ssafy.bium.gameroom.response.GameRoomListDto;
import com.ssafy.bium.gameroom.response.UserGameRecordDto;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;

import java.util.List;

public interface GameRoomService {
    String test(String sessionId) throws OpenViduJavaClientException, OpenViduHttpException;
    List<GameRoomListDto> searchGameRooms(String keyword);
    EnterGameRoomDto createGameRoom(GameRoomDto gameRoomDto, String userEmail) throws OpenViduJavaClientException, OpenViduHttpException;
    EnterUserDto enterGameRoom(EnterGameRoomDto enterGameRoomDto, String userEmail) throws OpenViduJavaClientException, OpenViduHttpException;
    DetailGameRoomDto searchGameRoom(String gameRoomId);
    String modifyGameRoom(ModifyGameRoomDto request);
    List<UserGameRecordDto> outGameRoom(String gameId);
    String startGameRoom(String gameRoomId);
    List<UserGameRecordDto> overGame(OverGameDto request) throws Exception;
    String deleteGameRoom(String gameRoomId);
    List<UserGameRecordDto> StopGameRoom(String gameRoomId);
}
