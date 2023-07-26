package com.ssafy.bium.user.service;

import com.ssafy.bium.user.User;

public interface UserService {
    // UserResponse getUserInfo(String loginId, String loginPw);
    User searchUser(String userEmail, String userPw);
}
