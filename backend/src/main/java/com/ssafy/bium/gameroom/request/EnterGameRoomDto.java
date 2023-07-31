package com.ssafy.bium.gameroom.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EnterGameRoomDto {
    private String gameRoomId;
    private String gameRoomPw;
    private String userEmail;

    @Builder
    public EnterGameRoomDto(String gameRoomId, String gameRoomPw, String userEmail) {
        this.gameRoomId = gameRoomId;
        this.gameRoomPw = gameRoomPw;
        this.userEmail = userEmail;
    }
}
