package com.ssafy.bium.gameroom.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OverUserGameRoomDto {
    private String userGameRoomId;
    private Long record;

    @Builder
    public OverUserGameRoomDto(String userGameRoomId, Long record) {
        this.userGameRoomId = userGameRoomId;
        this.record = record;
    }
}
