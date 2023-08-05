package com.ssafy.bium.gameroom.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
// 방 생성 시 요청받는 Dto
public class GameRoomDto {
    private String gameRoomTitle;
    private int gameRoomMovie; // 영상 종류
    private int maxPeople;
    private String gameRoomPw;;
}
