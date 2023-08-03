package com.ssafy.bium.gameroom.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserGameRecordDto {
    private String userEmail;
    private String gameRecord;

    @Builder
    public UserGameRecordDto(String userEmail, String gameRecord) {
        this.userEmail = userEmail;
        this.gameRecord = gameRecord;
    }
}
