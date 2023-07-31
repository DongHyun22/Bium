package com.ssafy.bium.user;

import com.ssafy.bium.common.Authority;
import com.ssafy.bium.common.TimeBaseEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
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

}
