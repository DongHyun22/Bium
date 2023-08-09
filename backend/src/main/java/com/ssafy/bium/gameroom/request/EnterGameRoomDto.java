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
    private boolean host;

    @Builder
    public EnterGameRoomDto(String gameRoomId, String gameRoomPw, String customSessionId, boolean host) {
        this.gameRoomId = gameRoomId;
        this.gameRoomPw = gameRoomPw;
        this.customSessionId = customSessionId;
        this.host = host;
    }
}
