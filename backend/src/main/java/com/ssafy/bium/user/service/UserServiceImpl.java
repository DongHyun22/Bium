package com.ssafy.bium.user.service;

import com.ssafy.bium.user.User;
import com.ssafy.bium.user.repository.UserRepository;
import com.ssafy.bium.user.request.UserLoginPostReq;
import com.ssafy.bium.user.request.UserModifyPostReq;
import com.ssafy.bium.user.request.UserRegisterPostReq;
import com.ssafy.bium.user.response.UserModifyGetRes;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User setUser(UserRegisterPostReq userRegisterInfo) {

        User user = User.builder()
                .userEmail(userRegisterInfo.getUserEmail())
                .userPw(userRegisterInfo.getUserPw())
                .userName(userRegisterInfo.getUserName())
                .userNickname(userRegisterInfo.getUserNickname())
                .build();

        System.out.println("userServiceImpl" + user.getUserEmail());
        return userRepository.save(user);

    }

    @Override
    public User getUserByUserEmail(String userEmail) {
        Optional<User> findUser = userRepository.findByUserEmail(userEmail);
        if(!findUser.isPresent()){
            return null;
        }
        return findUser.get();
    }

    @Override
    public int deleteUserByUserEmail(String userEmail) {

        Optional<User> findUser = userRepository.findByUserEmail(userEmail);
        if (!findUser.isPresent()) {
            return 1;
        }

        User user = findUser.get();
        if (!user.getUserEmail().equals(userEmail)) {
            return 1;
        }

        userRepository.delete(user);
        return 0;
    }

    @Override
    public User login(UserLoginPostReq userLoginPostReq) {
        return userRepository.findByUserEmail(userLoginPostReq.getUserEmail()).get();
    }

    @Override
    public UserModifyGetRes getModifyData(String userEmail) {

        UserModifyGetRes userModifyGetRes = null;
        Optional<User> user = userRepository.findByUserEmail(userEmail);
        if (user.isEmpty()) {
            System.out.println("해당 계정이 존재하지 않음");
        } else {
            userModifyGetRes = new UserModifyGetRes(user.get());
        }
        return userModifyGetRes;
    }

    @Override
    public int modifyProfile(UserModifyPostReq userModifyPostReq) {

        Optional<User> optionalUser = userRepository.findByUserEmail(userModifyPostReq.getUserEmail());
        if (optionalUser.isEmpty()) {
            System.out.println("해당 계정이 존재하지 않음");
            return 0;
        } else {
            User user = optionalUser.get();

            user.setUserPw(userModifyPostReq.getUserPw());
            user.setUserNickname(userModifyPostReq.getUserNickname());

            userRepository.save(user);
            return 1;
        }
    }

}
