package com.ssafy.bium.gameroom.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ModifyGameRoomDto {
    private String gameRoomId;
    private String gameRoomTitle;
    private int gameRoomMovie;
    private int maxPeople;
    private String gameRoomPw;

    @Builder

    public ModifyGameRoomDto(String gameRoomId, String gameRoomTitle, int gameRoomMovie, int maxPeople, String gameRoomPw) {
        this.gameRoomId = gameRoomId;
        this.gameRoomTitle = gameRoomTitle;
        this.gameRoomMovie = gameRoomMovie;
        this.maxPeople = maxPeople;
        this.gameRoomPw = gameRoomPw;
    }
}
