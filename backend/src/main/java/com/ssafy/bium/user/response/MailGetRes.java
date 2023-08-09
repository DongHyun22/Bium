package com.ssafy.bium.user.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MailGetRes {

    private String address;
    private String title;
    private String message;

}
