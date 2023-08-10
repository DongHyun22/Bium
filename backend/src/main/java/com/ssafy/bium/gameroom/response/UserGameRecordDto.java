package com.ssafy.bium.gameroom.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserGameRecordDto {
    private String userNickname;
    private String gameRecord;

    @Builder
    public UserGameRecordDto(String userNickname, String gameRecord) {
        this.userNickname = userNickname;
        this.gameRecord = gameRecord;
    }
}
