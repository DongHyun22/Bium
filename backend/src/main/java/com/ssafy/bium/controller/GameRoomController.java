package com.ssafy.bium.controller;

import com.ssafy.bium.gameroom.request.GameRoomDto;
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
            @RequestParam int page,
            @RequestParam String id
    ){
        return gameRoomService.searchGameRoom(sort, keyword, page, id);
    }

    @PostMapping("/enter")
    public String enter(
           @RequestParam String gameRoomId,
           @RequestParam String gameRoomTitle,
           @RequestParam int maxPeople
    ){
        GameRoomDto gameRoomDto = new GameRoomDto(gameRoomId, gameRoomTitle, maxPeople);
        // builder 사용 할 것 !
        return gameRoomService.createGameRoom(gameRoomDto);
    }
}
