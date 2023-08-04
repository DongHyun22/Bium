package com.ssafy.bium.user.request;

import com.ssafy.bium.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserModifyPostReq {

    String userEmail;
    String userPw;
    String userNickname;

}
