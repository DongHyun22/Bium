package com.ssafy.bium.user.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.bium.user.User;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class UserModifyGetRes {
    @JsonProperty
    Long id;
    @JsonProperty
    String userPw;
    @JsonProperty
    String userNickname;

    public UserModifyGetRes(User user) {

        this.id = user.getId();
        this.userPw = user.getUserPw();
        this.userNickname = user.getUserNickname();
    }

}
