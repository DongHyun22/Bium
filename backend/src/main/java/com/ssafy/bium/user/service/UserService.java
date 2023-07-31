package com.ssafy.bium.user.service;

import com.ssafy.bium.user.User;
import com.ssafy.bium.user.request.UserLoginPostReq;

public interface UserService {
    // UserResponse getUserInfo(String loginId, String loginPw);
    User getUser(String userEmail);
}
