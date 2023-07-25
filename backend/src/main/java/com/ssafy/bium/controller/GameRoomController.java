package com.ssafy.bium.controller;

import com.ssafy.bium.gameroom.response.GameRoomListDto;
import com.ssafy.bium.gameroom.service.GameRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/game")
public class GameRoomController {
    private final GameRoomService gameRoomService;

    @GetMapping("")
    public String list(
            @RequestParam int sort,
            @RequestParam String keyword,
            @RequestParam int page
    ){

        return GameRoomListDto<>
    }
}
