package com.ssafy.bium.gameroom.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GameRoomListDto {
    private String customSessionId;
    private String gameRoomTitle;
    private String start;
    private int gameRoomMovie;
    private int curPeople;
    private int maxPeople;

    @Builder
    public GameRoomListDto(String customSessionId, String gameRoomTitle, String start, int gameRoomMovie, int curPeople, int maxPeople) {
        this.customSessionId = customSessionId;
        this.gameRoomTitle = gameRoomTitle;
        this.start = start;
        this.gameRoomMovie = gameRoomMovie;
        this.curPeople = curPeople;
        this.maxPeople = maxPeople;
    }
}
