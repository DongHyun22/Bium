package com.ssafy.bium.user.controller;

import com.ssafy.bium.user.User;
import com.ssafy.bium.user.request.UserLoginPostReq;
import com.ssafy.bium.user.request.UserRegisterPostReq;
import com.ssafy.bium.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserLoginPostReq userLoginPostReq) {
        Map<String, Object> resultMap = new HashMap<>();


        userService.login(userLoginPostReq);
        resultMap.put("httpHeaders", "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjI5ODcwNzQ2NjJ9.lXRvR1Xv_W_WdAz15uw5VG4G6myl-fuj75tULle6vLs");
        resultMap.put("message", "success");

        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
    }

    // 로그아웃
    @GetMapping("/logout/{userEmail}")
    public ResponseEntity<?> logout(@PathVariable("userEmail") String userId) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
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
            @PathVariable("userEmail") String userEmail) {
        System.out.println("hello");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.UNAUTHORIZED;
//        if (tokenProvider.validateToken(request.getHeader("Authorization"))) {
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
//        } else {
//            resultMap.put("message", "fail");
//        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

}
