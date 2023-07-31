package com.ssafy.bium.user.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
//@ApiModel("UserLoginPostRequest")
public class UserLoginPostReq {

    String userEmail;
    String userPw;
}
