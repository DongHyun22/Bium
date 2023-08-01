package com.ssafy.bium.user;

import com.ssafy.bium.common.Authority;
import com.ssafy.bium.common.TimeBaseEntity;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;
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

    @Column(nullable = true)
    private boolean activated;

    @ManyToMany
    @JoinTable(
            name = "user_authority",
            joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")})
    private Set<Authority> authorities;

    @Builder
    public User(String userEmail, String userPw, String token, String userName, String userNickname,
                int userRank, Long todayBium, Long topBium, Long totalBium, boolean is_admin, boolean activated) {
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
