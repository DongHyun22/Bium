package com.ssafy.bium.user.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FilePostReq {

    Long userId;
    int imageType;
    String saveFolder;
    String originalFile;
    String saveFile;

}
