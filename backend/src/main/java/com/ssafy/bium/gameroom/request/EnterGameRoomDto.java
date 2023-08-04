package com.ssafy.bium.gameroom.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EnterGameRoomDto {
    private String gameRoomId;
    private String gameRoomPw;
    private String customSessionId;

    @Builder
    public EnterGameRoomDto(String gameRoomId, String gameRoomPw, String customSessionId) {
        this.gameRoomId = gameRoomId;
        this.gameRoomPw = gameRoomPw;
        this.customSessionId = customSessionId;
    }
}
