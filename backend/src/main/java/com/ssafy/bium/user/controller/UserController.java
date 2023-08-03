package com.ssafy.bium.user.controller;

import com.ssafy.bium.config.jwt.JwtFilter;
import com.ssafy.bium.config.jwt.TokenDto;
import com.ssafy.bium.config.jwt.TokenProvider;
import com.ssafy.bium.user.request.UserLoginPostReq;
import com.ssafy.bium.user.User;
import com.ssafy.bium.user.request.UserModifyPostReq;
import com.ssafy.bium.user.request.UserRegisterPostReq;
import com.ssafy.bium.user.response.UserModifyGetRes;
import com.ssafy.bium.user.response.UserRankingGetRes;
import com.ssafy.bium.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserLoginPostReq userLoginPostReq) {
        Map<String, Object> resultMap = new HashMap<>();
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userLoginPostReq.getUserEmail(), userLoginPostReq.getUserPw());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        TokenDto jwt = tokenProvider.createToken(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
        resultMap.put("message", "success");
        resultMap.put("httpHeaders", jwt.getAccessToken());

        userService.setToken(userLoginPostReq.getUserEmail(), jwt.getRefreshToken());

        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
    }

    // 로그아웃
    @GetMapping("/logout/{userEmail}")
    public ResponseEntity<?> logout(@PathVariable("userEmail") String userId) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            userService.deleteRefreshToken(userId);
            resultMap.put("message", "success");
            status = HttpStatus.ACCEPTED;
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody UserRegisterPostReq registerInfo) {

        System.out.println("userController" + registerInfo.getUserEmail());
        User user = userService.setUser(registerInfo);
        System.out.println(user);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 아이디 중복 체크
    @GetMapping("/signup/check")
    public ResponseEntity<?> emailCheck(@RequestParam String userEmail) {

        int cnt = 1;
        if (userService.getUserByUserEmail(userEmail) == null) {
            cnt = 0;
        }

        return new ResponseEntity<>(cnt, HttpStatus.OK);
    }

    // 회원탈퇴
    @PostMapping("profile/delete")
    public ResponseEntity<?> deleteUser(@RequestParam String userEmail) {

        int check = userService.deleteUserByUserEmail(userEmail);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    // 토큰과 유저 정보 반환
    @GetMapping("/info/{userEmail}")
    public ResponseEntity<Map<String, Object>> getInfo(
            @PathVariable("userEmail") String userEmail,
            HttpServletRequest request, Authentication authentication) {
        System.out.println("hello");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.UNAUTHORIZED;
        if (tokenProvider.validateToken(request.getHeader("Authorization"))) {
            try {
//				로그인 사용자 정보.
                User user = userService.getUserByUserEmail(userEmail);
                resultMap.put("userInfo", user);
                resultMap.put("message", "success");
                status = HttpStatus.ACCEPTED;
            } catch (Exception e) {
                resultMap.put("message", e.getMessage());
                status = HttpStatus.INTERNAL_SERVER_ERROR;
            }
        } else {
            resultMap.put("message", "fail");
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @GetMapping("profile/ranking/{userEmail}")
    public ResponseEntity<?> ranking (@PathVariable("userEmail") String userEmail) {

        Map<String, Object> resultMap = new HashMap<>();
        List<UserRankingGetRes> list = userService.getUserListTop5ByTotalBium();
        UserRankingGetRes userRankingGetRes = userService.getUserByTotalBium(userEmail);
        resultMap.put("ranking", list);
        resultMap.put("myRanking", userRankingGetRes);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @GetMapping("profile/modify/{userEmail}")
    public ResponseEntity<?> getModifyData (@PathVariable("userEmail") String userEmail) {

        UserModifyGetRes userModifyGetRes = userService.getModifyData(userEmail);
        return new ResponseEntity<>(userModifyGetRes, HttpStatus.OK);
    }

    @PostMapping("profile/modify")
    public ResponseEntity<?> modifyProfile (@RequestBody UserModifyPostReq userModifyPostReq) {

        int result = userService.modifyProfile(userModifyPostReq);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
