package com.ssafy.bium.user.service;

import com.ssafy.bium.user.User;

import com.ssafy.bium.user.request.UserLoginPostReq;
import com.ssafy.bium.user.request.UserRegisterPostReq;


public interface UserService {

    User setUser(UserRegisterPostReq userRegisterInfo);
    User getUserByUserEmail(String userEmail);
    int deleteUserByUserEmail(String userEmail);
    int deleteRefreshToken(String userEmail);
    void setToken(String userEmail, String token);

    public User login(UserLoginPostReq userLoginPostReq);
}
