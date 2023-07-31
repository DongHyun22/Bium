package com.ssafy.bium.user.service;

import com.ssafy.bium.common.Authority;
import com.ssafy.bium.config.jwt.TokenProvider;
import com.ssafy.bium.user.User;
import com.ssafy.bium.user.repository.UserRepository;
import com.ssafy.bium.user.request.UserLoginPostReq;
import com.ssafy.bium.user.request.UserRegisterPostReq;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @Override
    public User getUser(String userEmail) {
        Optional<User> findUser = userRepository.findByUserEmail(userEmail);

        if (!findUser.isPresent()) {
            System.out.println("유저 존재하지 않음");
            return null;
            // 예외 처리
        }

        return findUser.get();
    }

    public User login(UserLoginPostReq userLoginPostReq) {
        String userEmail = userLoginPostReq.getUserEmail();
        String userPw = userLoginPostReq.getUserPw();

        Optional<User> findUser = userRepository.findByUserEmail(userEmail);

        if (!findUser.isPresent()) {
            System.out.println("로그인 실패");
            return null;
            // 예외 처리
        } else {
            if (!findUser.get().getUserPw().equals(userPw)) {
                System.out.println("비밀번호가 틀립니다.");
                return null;
            }
            return findUser.get();
        }
    }

    @Override
    public User setUser(UserRegisterPostReq userRegisterInfo) {

        Authority authority = Authority.builder()
                .authorityName("ROLE_USER")
                .build();

        System.out.println("userServiceImpl" + userRegisterInfo.getUserEmail());
        User user = User.builder()
                .userEmail(userRegisterInfo.getUserEmail())
                .userPw(passwordEncoder.encode(userRegisterInfo.getUserPw()))
//                .userRegisterInfo.getUserPw()
                .userName(userRegisterInfo.getUserName())
                .userNickname(userRegisterInfo.getUserNickname())
                .authorities(Collections.singleton(authority))
                .activated(true)
                .build();

        System.out.println("userServiceImpl" + user.getUserEmail());
        return userRepository.save(user);

    }

    @Override
    public int getUserByUserEmail(String userEmail) {
        Optional<User> findUser = userRepository.findByUserEmail(userEmail);
        if(!findUser.isPresent()){
            return 0;
        }
        return 1;
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

}
