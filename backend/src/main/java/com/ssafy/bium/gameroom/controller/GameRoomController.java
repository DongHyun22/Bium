package com.ssafy.bium.gameroom.controller;

import com.ssafy.bium.gameroom.request.EnterGameRoomDto;
import com.ssafy.bium.gameroom.request.GameRoomDto;
import com.ssafy.bium.gameroom.request.ModifyGameRoomDto;
import com.ssafy.bium.gameroom.request.OverGameDto;
import com.ssafy.bium.gameroom.response.DetailGameRoomDto;
import com.ssafy.bium.gameroom.response.EnterUserDto;
import com.ssafy.bium.gameroom.response.GameRoomListDto;
import com.ssafy.bium.gameroom.response.UserGameRecordDto;
import com.ssafy.bium.gameroom.service.GameRoomService;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/game")
@CrossOrigin(origins = "*")
public class GameRoomController {
    private final GameRoomService gameRoomService;

    @GetMapping("/test")
    public void test(
            @RequestParam String sessionId
    ) throws OpenViduJavaClientException, OpenViduHttpException {
        gameRoomService.test(sessionId);
    }


    @GetMapping("")
    public List<GameRoomListDto> list(
            @RequestParam String keyword
            // sort, keyword 변수 넣어서 정렬 및 검색 기능 구현
    ) {
        return gameRoomService.searchGameRooms(keyword);
    }


    @PostMapping("/create")
    public EnterGameRoomDto create(
            @RequestBody GameRoomDto request,
            @RequestParam String userEmail
    ) throws OpenViduJavaClientException, OpenViduHttpException {
        // 방 생성
        return gameRoomService.createGameRoom(request, userEmail);
    }

    @PostMapping("/enter")
    public EnterUserDto enter(
            @RequestBody EnterGameRoomDto request,
            @RequestParam String userEmail
    ) throws OpenViduJavaClientException, OpenViduHttpException {
        return gameRoomService.enterGameRoom(request, userEmail);
    }

    @GetMapping("/modify")
    public DetailGameRoomDto modify(
            @RequestParam String gameRoomId
    ) {
        return gameRoomService.searchGameRoom(gameRoomId);
    }

    @PostMapping("/modify")
    public String modify(
            @RequestBody ModifyGameRoomDto request
    ) {
        return gameRoomService.modifyGameRoom(request);
    }

    @PostMapping("/out")
    public List<UserGameRecordDto> out(
            @RequestParam String gameId
    ) {
        return gameRoomService.outGameRoom(gameId);
    }

    @PostMapping("/start")
    public String start(
            @RequestParam String gameRoomId
    ) {
        return gameRoomService.startGameRoom(gameRoomId);
    }

    @PostMapping("/over")
    public List<UserGameRecordDto> over(
            @RequestBody OverGameDto request
    ) throws Exception {
        return gameRoomService.overGame(request);
    }

    @GetMapping("/stop")
    public List<UserGameRecordDto> stop(
            @RequestParam String gameRoomId
    ) {
        return gameRoomService.StopGameRoom(gameRoomId);
    }

    // 게임 종료시 게임 기록 반환 및 게임 기록 유저에 저장
    @PostMapping("/delete")
    public String delete(
            @RequestParam String gameRoomId
    ) {
        return gameRoomService.deleteGameRoom(gameRoomId);
    }
}

