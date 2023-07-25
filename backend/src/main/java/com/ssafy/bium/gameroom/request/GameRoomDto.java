package com.ssafy.bium.gameroom.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameRoomDto {
    private String id;
    private String title;
    private int maxPeople;
}
