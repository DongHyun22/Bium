package com.ssafy.bium.user.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FilePostReq {

    int idx;
    String userEmail;
    String saveFolder;
    String originalFile;
    String saveFile;

}
