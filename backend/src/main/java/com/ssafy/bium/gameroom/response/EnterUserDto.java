package com.ssafy.bium.gameroom.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EnterUserDto {
    private String sessionId;
    private String gameId;

    @Builder
    public EnterUserDto(String sessionId, String gameId) {
        this.sessionId = sessionId;
        this.gameId = gameId;
    }
}
