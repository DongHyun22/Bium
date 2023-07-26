package com.ssafy.bium.gameroom;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Data
@NoArgsConstructor
@RedisHash(value = "gameRoom")
public class GameRoom {

    @Id
    private String gameRoomId;
    private String gameRoomTitle;
//    private boolean isStart;
//    private String gameRoomPw;
//    private int gameRoomMovie;
//    private int curPeople;
    private int maxPeople;
//    private LocalDateTime gameCreateDate;
//    private LocalDateTime gameModifiedDate;

}
