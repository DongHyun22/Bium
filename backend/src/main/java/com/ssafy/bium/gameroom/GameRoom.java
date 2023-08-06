package com.ssafy.bium.gameroom;

import com.ssafy.bium.common.TimeBaseEntity;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@Getter
@NoArgsConstructor
@RedisHash("gameRoom")
public class GameRoom extends TimeBaseEntity {

    @Id
    private String gameRoomId;
    private String gameRoomTitle;
    private boolean start;
    private String gameRoomPw;
    private int gameRoomMovie;
    private int curPeople;
    private int maxPeople;
    private String customSessionId;
    // 생성 일자 넣어서 정렬 기능 추가

    @Builder
    public GameRoom(String gameRoomId, String gameRoomTitle, boolean start, String gameRoomPw, int gameRoomMovie, int curPeople, int maxPeople, String customSessionId) {
        this.gameRoomId = gameRoomId;
        this.gameRoomTitle = gameRoomTitle;
        this.start = start;
        this.gameRoomPw = gameRoomPw;
        this.gameRoomMovie = gameRoomMovie;
        this.curPeople = curPeople;
        this.maxPeople = maxPeople;
        this.customSessionId = customSessionId;
    }

    public void modifyGameRoom() {

    }
}
