package com.ssafy.bium.gameroom;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class GameRoom {

    @Id
    private Long gameRoomId;
    private String gameRoomTitle;
    private boolean isStart;
    private String gameRoomPw;
    private int gameRoomMovie;
    private int curPeople;
    private int maxPeople;
    private LocalDateTime gameCreateDate;
    private LocalDateTime gameModifiedDate;

}
