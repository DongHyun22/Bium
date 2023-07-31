package com.ssafy.bium.gameroom.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SearchGameRoomDto {
    private int sort;
    private String keyword;
//    private int page;
}
