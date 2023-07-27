package com.ssafy.bium.controller;

import com.ssafy.bium.user.User;
import com.ssafy.bium.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @GetMapping("/login")
    public ResponseEntity<?> login(@RequestParam String userEmail, @RequestParam String userPw) {

        User user = userService.searchUser(userEmail, userPw);
        return new ResponseEntity<>(user.getId(), HttpStatus.OK);
    }


}
