package com.ssafy.bium.user.service;

import com.ssafy.bium.image.Image;
import com.ssafy.bium.user.User;

import com.ssafy.bium.user.request.FilePostReq;
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
    public User login(UserLoginPostReq userLoginPostReq);
    void saveRefreshToken(String userEmail, String refreshToken);
    Object getRefreshToken(String userEmail);
    UserModifyGetRes getModifyData(String userEmail);
    int modifyProfile(UserModifyPostReq userModifyPostReq);
    Image setImage(FilePostReq filePostReq);
    Image getImageData(String userEmail, int imgType);
    List<UserRankingGetRes> getUserListTop5ByTotalBium();
    UserRankingGetRes getUserByTotalBium(String userEmail);

}
