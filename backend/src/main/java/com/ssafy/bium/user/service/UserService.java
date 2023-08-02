package com.ssafy.bium.user.service;

import com.ssafy.bium.user.User;

import com.ssafy.bium.user.request.UserLoginPostReq;
import com.ssafy.bium.user.request.UserModifyPostReq;
import com.ssafy.bium.user.request.UserRegisterPostReq;
import com.ssafy.bium.user.response.UserModifyGetRes;
import com.ssafy.bium.user.response.UserRankingGetRes;

import java.util.List;


public interface UserService {

    User setUser(UserRegisterPostReq userRegisterInfo);
    User getUserByUserEmail(String userEmail);
    int deleteUserByUserEmail(String userEmail);
    int deleteRefreshToken(String userEmail);
    void setToken(String userEmail, String token);
    List<UserRankingGetRes> getUserListTop5ByTotalBium();
    UserRankingGetRes getUserByTotalBium(String userEmail);
    UserModifyGetRes getModifyData(String userEmail);
    int modifyProfile(UserModifyPostReq userModifyPostReq);
}
