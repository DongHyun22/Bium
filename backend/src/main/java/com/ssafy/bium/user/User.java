package com.ssafy.bium.user;

import com.ssafy.bium.common.TimeBaseEntity;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class User extends TimeBaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private Long id;
    @Column(nullable = false)
    private String userEmail;
    @Column(nullable = false)
    private String userPw;
    @Column(nullable = true)
    private String token;
    @Column(nullable = false)
    private String userName;
    @Column(nullable = false)
    private String userNickname;
    @Column(nullable = false)
    private int userRank;
    @Column(nullable = false)
    private Long todayBium;
    @Column(nullable = false)
    private Long topBium;
    @Column(nullable = false)
    private Long totalBium;
    @Column(nullable = false)
    private boolean is_admin;

}
