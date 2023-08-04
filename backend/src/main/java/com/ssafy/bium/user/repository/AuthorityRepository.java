package com.ssafy.bium.user.repository;

import com.ssafy.bium.common.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {

    Optional<Authority> findByAuthorityName(String authorityName);

}
