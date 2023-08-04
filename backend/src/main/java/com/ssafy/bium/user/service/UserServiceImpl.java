package com.ssafy.bium.user.service;

import com.ssafy.bium.common.Authority;
import com.ssafy.bium.config.jwt.TokenProvider;
import com.ssafy.bium.user.User;
import com.ssafy.bium.user.repository.AuthorityRepository;
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
    private final AuthorityRepository authorityRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;



    public void setToken(String userEmail, String token) {

        Optional<User> user = userRepository.findByUserEmail(userEmail);
        if (user.isEmpty()) {
            System.out.println("유저가 존재하지 않음");
        } else {
            user.get().setToken(token);
            userRepository.save(user.get());
        }

    }

    @Override
    public User setUser(UserRegisterPostReq userRegisterInfo) {

        Optional<Authority> optionalAuthority = authorityRepository.findByAuthorityName("ROLE_USER");
        Authority authority;
        if (optionalAuthority.isEmpty()) {
            authority = Authority.builder()
                    .authorityName("ROLE_USER")
                    .build();
        } else {
            authority = optionalAuthority.get();
        }

        User user = User.builder()
                .userEmail(userRegisterInfo.getUserEmail())
                .userPw(passwordEncoder.encode(userRegisterInfo.getUserPw()))
                .userName(userRegisterInfo.getUserName())
                .userNickname(userRegisterInfo.getUserNickname())
                .authorities(Collections.singleton(authority))
                .activated(true)
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
    public int deleteRefreshToken(String userEmail) {
        return 0;
    }

    @Override
    public User login(UserLoginPostReq userLoginPostReq) {
        return userRepository.findByUserEmail(userLoginPostReq.getUserEmail()).get();
    }
}
