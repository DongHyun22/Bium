package com.ssafy.bium.gameroom.controller;

import com.ssafy.bium.gameroom.request.*;
import com.ssafy.bium.gameroom.response.DetailGameRoomDto;
import com.ssafy.bium.gameroom.response.GameRoomListDto;
import com.ssafy.bium.gameroom.service.GameRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/game")
public class GameRoomController {
    private final GameRoomService gameRoomService;

    @GetMapping("")
    public List<GameRoomListDto> list(
            @RequestBody SearchGameRoomDto request
    ) {
        return gameRoomService.searchGameRooms(request);
    }


    @PostMapping("/create")
    public Long create(
            @RequestBody GameRoomDto request,
            @RequestParam String userEmail
    ) {
        // 방 생성
        Long gameRoomId = gameRoomService.createGameRoom(request, userEmail);
        return gameRoomId;
    }

    @PostMapping("/enter")
    public String enter(
            @RequestParam Long gameRoomId,
            @RequestParam String gameRoomPw,
            @RequestParam String userEmail
    ) {
        EnterGameRoomDto enterGameRoomDto = EnterGameRoomDto.builder()
                .gameRoomId(String.valueOf(gameRoomId))
                .gameRoomPw(gameRoomPw)
                .userEmail(userEmail)
                .build();
        String userGameRoomId = gameRoomService.enterGameRoom(enterGameRoomDto);
        return userGameRoomId;
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
    public String out(
            @RequestParam String userGameRoomId
    ) {
        return gameRoomService.outGameRoom(userGameRoomId);
    }

    @PostMapping("/start")
    public String start(
            @RequestParam String gameRoomId
    ) {
        return gameRoomService.startGameRoom(gameRoomId);
    }

    @PostMapping("/over")
    public String over(
            @RequestParam String userGameRoomId,
            @RequestParam Long record
    ){
        OverUserGameRoomDto request = OverUserGameRoomDto.builder()
                .userGameRoomId(userGameRoomId)
                .record(record)
                .build();
        return gameRoomService.overUserGameRoom(request);
    }

    // 게임 종료시 게임 기록 반환 및 게임 기록 유저에 저장
    @PostMapping("/delete")
    public String delete(
            @RequestParam String gameRoomId
    ) {
        return gameRoomService.deleteGameRoom(gameRoomId);
    }
}

