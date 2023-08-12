package com.ssafy.bium.gameroom.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserGameRecordDto {
    private int index;
    private String userNickname;
    private String gameRecord;

    @Builder
    public UserGameRecordDto(int index, String userNickname, String gameRecord) {
        this.index = index;
        this.userNickname = userNickname;
        this.gameRecord = gameRecord;
    }
}
