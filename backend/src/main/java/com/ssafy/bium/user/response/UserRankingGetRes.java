package com.ssafy.bium.user.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.bium.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserRankingGetRes {

    @JsonProperty
    Long id;
    @JsonProperty
    String userEmail;
    @JsonProperty
    String userNickname;
    @JsonProperty
    int userRank;
    @JsonProperty
    Long topBium;
    int ranking;

    public UserRankingGetRes(User user) {
        this.id = user.getId();
        this.userEmail = user.getUserEmail();
        this.userNickname = user.getUserNickname();
        this.userRank = user.getUserRank();
        this.topBium = user.getTopBium();
        this.ranking = 0;
    }

}
