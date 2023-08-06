package com.ssafy.bium.gameroom.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GameRoomListDto {
    private String gameRoomTitle;
    private boolean start;
    private int gameRoomMovie;
    private int curPeople;
    private int maxPeople;

    @Builder
    public GameRoomListDto(String gameRoomTitle, boolean start, int gameRoomMovie, int curPeople, int maxPeople) {
        this.gameRoomTitle = gameRoomTitle;
        this.start = start;
        this.gameRoomMovie = gameRoomMovie;
        this.curPeople = curPeople;
        this.maxPeople = maxPeople;
    }
}
