package com.ssafy.bium.user.service;

import com.ssafy.bium.common.Authority;
import com.ssafy.bium.config.jwt.TokenProvider;
import com.ssafy.bium.user.User;
import com.ssafy.bium.user.repository.UserRepository;
import com.ssafy.bium.user.request.UserLoginPostReq;
import com.ssafy.bium.user.request.UserRegisterPostReq;
import com.ssafy.bium.user.response.UserRankingGetRes;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
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

        Authority authority = Authority.builder()
                .authorityName("ROLE_USER")
                .build();

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
    public List<UserRankingGetRes> getUserListTop5ByTotalBium() {

        List<UserRankingGetRes> list = userRepository.findTop5ByOrderByTotalBiumDesc()
                .stream().map(UserRankingGetRes::new).collect(Collectors.toList());
        if (list.isEmpty()) {
            System.out.println("1~5위 랭킹 없음");
        }

        for (int i = 0; i < list.size(); i++) {
            list.get(i).setRanking(i + 1);
        }
        return list;
    }

    @Override
    public UserRankingGetRes getUserByTotalBium(String userEmail) {

        List<UserRankingGetRes> list = userRepository.findUserByOrderByTotalBiumDesc()
                .stream().map(UserRankingGetRes::new).collect(Collectors.toList());
        if (list.isEmpty()) {
            System.out.println("user 정보 없음");
        }

        int userRanking = 0;
        UserRankingGetRes userRankingGetRes = new UserRankingGetRes();
        for (UserRankingGetRes temp : list) {
            userRanking++;
            if (temp.getUserEmail().equals(userEmail)) {
                userRankingGetRes = temp;
                userRankingGetRes.setRanking(userRanking);
                break;
            }
        }

        return userRankingGetRes;

    }
}
