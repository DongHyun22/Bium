package com.ssafy.bium.image.repository;

import com.ssafy.bium.image.Image;
import com.ssafy.bium.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<User, Long> {

//    Optional<Image> findByUserEmailAnd
}
