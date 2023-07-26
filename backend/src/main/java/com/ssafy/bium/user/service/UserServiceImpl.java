package com.ssafy.bium.user.service;

import com.ssafy.bium.user.User;
import com.ssafy.bium.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public User searchUser(String userEmail, String userPw) {
//        Optional<User> findUser = userRepository.findById(id);
        Optional<User> findUser = userRepository.findByUserEmailAndUserPw(userEmail, userPw);
        if (!findUser.isPresent()) {
            System.out.println("로그인 실패");
            return null;
            // 예외 처리
        }
        User user = findUser.get();
        return user;
    }
}
