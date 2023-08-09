package com.ssafy.bium.gameroom.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EnterUserDto {
    private String sessionId;
    private String gameId;
    private boolean host;

    @Builder
    public EnterUserDto(String sessionId, String gameId, boolean host) {
        this.sessionId = sessionId;
        this.gameId = gameId;
        this.host = host;
    }
}
