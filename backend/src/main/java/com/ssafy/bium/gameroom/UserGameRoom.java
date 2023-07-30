package com.ssafy.bium.gameroom;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@NoArgsConstructor
@RedisHash(value = "userGameRoom")
public class UserGameRoom {

    @Id
    private Long detailGameRoomId;
    private Long gameRoomId;
    private Long user_id;
    private boolean isHost;
    private int sequence;
    private Long gameRecord;

    @Builder
    public UserGameRoom(Long detailGameRoomId, Long gameRoomId, Long user_id, boolean isHost, int sequence, Long gameRecord) {
        this.detailGameRoomId = detailGameRoomId;
        this.gameRoomId = gameRoomId;
        this.user_id = user_id;
        this.isHost = isHost;
        this.sequence = sequence;
        this.gameRecord = gameRecord;
    }
}
