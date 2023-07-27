package com.ssafy.bium.gameroom;

import com.ssafy.bium.common.TimeBaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Data
@NoArgsConstructor
@RedisHash(value = "gameRoom")
public class GameRoom extends TimeBaseEntity {

    @Id
    private String gameRoomId;
    private String gameRoomTitle;
    private boolean isStart;
    private String gameRoomPw;
    private int gameRoomMovie;
    private int curPeople;
    private int maxPeople;

}
