package com.ssafy.bium.user.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.bium.user.User;

public class UserRankingGetRes {

    @JsonProperty
    Long id;
    @JsonProperty
    String userNickname;
    @JsonProperty
    int userRank;
    @JsonProperty
    Long topBium;

    public UserRankingGetRes(User user) {
        this.id = user.getId();
        this.userNickname = user.getUserNickname();
        this.userRank = user.getUserRank();
        this.topBium = user.getTopBium();
    }

}
