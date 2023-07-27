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
@Setter
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
    @Column(nullable = false, columnDefinition = "integer default 25")
    private Long todayBium;
    @Column(nullable = false, columnDefinition = "integer default 25")
    private Long topBium;
    @Column(nullable = false, columnDefinition = "integer default 25")
    private Long totalBium;
    @Column(nullable = false)
    private boolean is_admin;

    @Builder
    public User(String userEmail, String userPw, String token, String userName, String userNickname,
                int userRank, Long todayBium, Long topBium, Long totalBium, boolean is_admin){
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

        if (todayBium == null) {
            this.todayBium = 0L;
        }

        if (topBium == null) {
            this.topBium = 0L;
        }

        if (totalBium == null) {
            this.totalBium = 0L;
        }
    }

}
