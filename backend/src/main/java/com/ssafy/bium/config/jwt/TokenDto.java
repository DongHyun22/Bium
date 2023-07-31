package com.ssafy.bium.config.jwt;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TokenDto {

    private String grantType;
    private String accessToken;
    private String refreshToken;

}