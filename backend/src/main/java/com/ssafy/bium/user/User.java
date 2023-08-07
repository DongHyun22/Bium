package com.ssafy.bium.user;

import com.ssafy.bium.common.TimeBaseEntity;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
public class User extends TimeBaseEntity {

    @Id
    @GeneratedValue // 자동 증가
    @Column(name = "user_id")
    private Long id;

    @Column(nullable = false)
    private String userEmail;

    @Column(nullable = false)
    private String userPw;

    @Column
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
    private boolean isAdmin;

    @Builder
    public User(String userEmail, String userPw, String token, String userName, String userNickname,
                int userRank, Long todayBium, Long topBium, Long totalBium, boolean isAdmin) {
        this.userEmail = userEmail;
        this.userPw = userPw;
        this.token = token;
        this.userName = userName;
        this.userNickname = userNickname;
        this.userRank = userRank;
        this.todayBium = todayBium;
        this.topBium = topBium;
        this.totalBium = totalBium;
        this.isAdmin = isAdmin;

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

    public void saveBium(Long bium){
        this.todayBium += bium;
        this.totalBium += bium;
        if(this.topBium < bium){
            this.topBium = bium;
        }
    }

}
