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
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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
    @Column(nullable = false)
    private LocalDateTime createDate;
    @Column(nullable = false)
    private LocalDateTime modifiedDate;

    @Builder
    public User(Long id, String userEmail, String userPw, String token, String userName, String userNickname, int userRank, Long todayBium, Long topBium, Long totalBium, boolean is_admin, LocalDateTime createDate, LocalDateTime modifiedDate) {
        this.id = id;
        this.userEmail = userEmail;
        this.userPw = userPw;
        this.token = token;
        this.userName = userName;
        this.userNickname = userNickname;
        this.userRank = userRank;
        this.todayBium = todayBium;
        this.topBium = topBium;
        this.totalBium = totalBium;
        this.is_admin = is_admin;
        this.createDate = createDate;
        this.modifiedDate = modifiedDate;
    }

}
