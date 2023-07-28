package com.ssafy.bium.gameroom;

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
    private String detailGameRoomId;
    private Long gameRoomId;
    private Long user_id;
    private boolean isHost;
    private int sequence;
    private boolean gameRecord;
}
