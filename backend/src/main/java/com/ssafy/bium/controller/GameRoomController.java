package com.ssafy.bium.controller;

import com.ssafy.bium.gameroom.request.EnterGameRoomDto;
import com.ssafy.bium.gameroom.request.GameRoomDto;
import com.ssafy.bium.gameroom.request.SearchGameRoomDto;
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
        return gameRoomService.searchGameRoom(request);
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
    public Long enter(
            @RequestParam Long gameRoomId,
            @RequestParam String gameRoomPw,
            @RequestParam String userEmail
    ) {
        EnterGameRoomDto enterGameRoomDto = EnterGameRoomDto.builder()
                .gameRoomId(String.valueOf(gameRoomId))
                .gameRoomPw(gameRoomPw)
                .userEmail(userEmail)
                .build();
        Long userGameRoomId = gameRoomService.enterGameRoom(enterGameRoomDto);
        return 0L;
    }
}


//    ArticleSearch condition = ArticleSearch.builder()
//            .condition(keyword)
//            .sortCondition(sortCondition)
//            .build();
//    PageRequest pageRequest = PageRequest.of(page - 1, 10);
//    Page<ArticleListDto> articleListDto = articleService.searchArticles(condition, pageRequest);
//        return new Result<Page<ArticleListDto>>(articleListDto);
