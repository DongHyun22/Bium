package com.ssafy.bium.gameroom.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GameRoomDto {
    private String title;
    private int movie; // 영상 종류
    private int maxPeople;
    private String pw;
    private String userEmail;
}
