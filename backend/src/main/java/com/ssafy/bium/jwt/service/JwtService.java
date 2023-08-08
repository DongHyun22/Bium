package com.ssafy.bium.jwt.service;

import com.ssafy.bium.jwt.Token;

import java.util.Map;

public interface JwtService {

    public void afterPropertiesSet();
    Token create(String subject);
    Map<String, Object> get(String key);
    String getUserId();
    boolean checkToken(String jwt);

}