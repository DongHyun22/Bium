package com.ssafy.bium.user.service;

import com.ssafy.bium.user.User;
import com.ssafy.bium.user.request.UserRegisterPostReq;

public interface UserService {
    // UserResponse getUserInfo(String loginId, String loginPw);
    User searchUser(String userEmail, String userPw);
    User setUser(UserRegisterPostReq userRegisterInfo);
    int getUserByUserEmail(String userEmail);
}
