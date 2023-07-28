package com.ssafy.bium.controller;

import com.ssafy.bium.gameroom.request.SearchGameRoomDto;
import com.ssafy.bium.gameroom.response.GameRoomListDto;
import com.ssafy.bium.gameroom.service.GameRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/game")
public class GameRoomController {
    private final GameRoomService gameRoomService;

    @GetMapping("")
    public GameRoomListDto list(
            @RequestBody SearchGameRoomDto request
    ){
        return gameRoomService.searchGameRoom(request);
    }

//    @RequestBody SearchGameRoomDto request
//    ){
//        PageRequest pageRequest = PageRequest.of(request.getPage(), 10);

    @PostMapping("/enter")
    public String enter(
           @RequestBody SearchGameRoomDto request
    ){
        // builder 사용 할 것 !
        return gameRoomService.createGameRoom(searchGameRoomDto);
    }
}

//    ArticleSearch condition = ArticleSearch.builder()
//            .condition(keyword)
//            .sortCondition(sortCondition)
//            .build();
//    PageRequest pageRequest = PageRequest.of(page - 1, 10);
//    Page<ArticleListDto> articleListDto = articleService.searchArticles(condition, pageRequest);
//        return new Result<Page<ArticleListDto>>(articleListDto);
