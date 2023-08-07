package com.ssafy.bium.gameroom.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DetailGameRoomDto {
    private String gameRoomTitle;
    private int gameRoomMovie;
    private int maxPeople;
    private String gameRoomPw;

    @Builder
    public DetailGameRoomDto(String gameRoomTitle, int gameRoomMovie, int maxPeople, String gameRoomPw) {
        this.gameRoomTitle = gameRoomTitle;
        this.gameRoomMovie = gameRoomMovie;
        this.maxPeople = maxPeople;
        this.gameRoomPw = gameRoomPw;
    }
}
