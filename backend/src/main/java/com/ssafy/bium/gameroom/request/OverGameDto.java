package com.ssafy.bium.gameroom.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OverGameDto {
    private String gameId;
    private Long gameRecord;

    @Builder
    public OverGameDto(String gameId, Long gameRecord) {
        this.gameId = gameId;
        this.gameRecord = gameRecord;
    }
}
