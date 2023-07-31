package com.ssafy.bium.user.repository;

import com.ssafy.bium.user.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserEmail(String userEmail);
    @EntityGraph(attributePaths = "authorities")
    Optional<User> findOneWithAuthoritiesByUserEmail(String userEmail);
}
