package com.ssafy.bium.image.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.bium.image.Image;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class ImageDataGetRes {

    @JsonProperty
    int imgType;

    @JsonProperty
    String saveFolder;

    @JsonProperty
    String originalFile;

    @JsonProperty
    String saveFile;

    public ImageDataGetRes(Image image) {

        this.imgType = image.getImgType();
        this.saveFolder = image.getSaveFolder();
        this.originalFile = image.getOriginalFile();
        this.saveFile = image.getSaveFile();

    }
}
