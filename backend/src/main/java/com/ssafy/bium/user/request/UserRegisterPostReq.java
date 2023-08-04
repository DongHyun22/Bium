package com.ssafy.bium.user.request;

import lombok.*;

@Data
@NoArgsConstructor
public class UserRegisterPostReq {
    String userEmail;
    String userPw;
    String userName;
    String userNickname;

    @Builder
    public UserRegisterPostReq(String userEmail, String userPw, String userName, String userNickname){
        this.userEmail = userEmail;
        this.userPw = userPw;
        this.userName = userName;
        this.userNickname = userNickname;
    }
}
