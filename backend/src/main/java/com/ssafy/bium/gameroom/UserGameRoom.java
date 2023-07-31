package com.ssafy.bium.gameroom;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@NoArgsConstructor
@RedisHash("userGameRoom")
public class UserGameRoom {

    @Id
    private String userGameRoomId;
    private String gameRoomId;
    private String userEmail;
    private boolean isHost;
    private int sequence;
    private Long gameRecord;

    @Builder
    public UserGameRoom(String userGameRoomId, String gameRoomId, String userEmail, boolean isHost, int sequence, Long gameRecord) {
        this.userGameRoomId = userGameRoomId;
        this.gameRoomId = gameRoomId;
        this.userEmail = userEmail;
        this.isHost = isHost;
        this.sequence = sequence;
        this.gameRecord = gameRecord;
    }
}
