package com.ssafy.bium.user.repository;

import com.ssafy.bium.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUserEmailAndUserPw(String UserEmail, String UserPw);
    Optional<User> findByLoginId(String userEmail);
    Optional<User> findById(Long id);
}
