package com.ssafy.bium.user.repository;

import com.ssafy.bium.user.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUserEmail(String userEmail);

    Optional<User> findByUserEmailAndUserPw(String userEmail, String userPw);

    List<User> findTop5ByOrderByTotalBiumDesc();

    List<User> findUserByOrderByTotalBiumDesc();
}
