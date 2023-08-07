package com.ssafy.bium.image.repository;

import com.ssafy.bium.image.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {

    Optional<Image> findByUserIdAndImgType(Long userId, int imgType);
    void deleteImageByUserIdAndImgType(Long userId, int imgType);
}
