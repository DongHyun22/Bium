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
    public User getUserInfo(String loginId, String loginPw) {
        Optional<User> findUser = userRepository.findByLoginId(loginId);
        if (!findUser.isPresent()) {
            System.out.println("로그인 없음");
            return null;
        }
        User user = findUser.get();
        return user;
    }
}
