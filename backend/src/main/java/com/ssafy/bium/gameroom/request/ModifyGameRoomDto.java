package com.ssafy.bium.gameroom.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ModifyGameRoomDto {
    private String title;
    private int gameRoomMovie;
    private int maxPeople;
    private String gameRoomPw;

    @Builder
    public ModifyGameRoomDto(String title, int gameRoomMovie, int maxPeople, String gameRoomPw) {
        this.title = title;
        this.gameRoomMovie = gameRoomMovie;
        this.maxPeople = maxPeople;
        this.gameRoomPw = gameRoomPw;
    }
}
