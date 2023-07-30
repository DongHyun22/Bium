package com.ssafy.bium.gameroom;

import com.ssafy.bium.common.TimeBaseEntity;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@NoArgsConstructor
@RedisHash(value = "gameRoom")
public class GameRoom extends TimeBaseEntity {

    @Id
    private Long gameRoomId;
    private String gameRoomTitle;
    private boolean isStart;
    private String gameRoomPw;
    private int gameRoomMovie;
    private int curPeople;
    private int maxPeople;

    @Builder
    public GameRoom(Long gameRoomId, String gameRoomTitle, boolean isStart, String gameRoomPw, int gameRoomMovie, int curPeople, int maxPeople) {
        this.gameRoomId = gameRoomId;
        this.gameRoomTitle = gameRoomTitle;
        this.isStart = isStart;
        this.gameRoomPw = gameRoomPw;
        this.gameRoomMovie = gameRoomMovie;
        this.curPeople = curPeople;
        this.maxPeople = maxPeople;
    }
}
