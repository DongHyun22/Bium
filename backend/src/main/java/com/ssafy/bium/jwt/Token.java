package com.ssafy.bium.jwt;

import lombok.Builder;
import lombok.Data;

@Data
public class Token {

    private String access;
    private String refresh;

    @Builder
    public Token(String access, String refresh) {
        this.access = access;
        this.refresh = refresh;
    }

}
