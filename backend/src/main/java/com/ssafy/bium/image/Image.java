package com.ssafy.bium.image;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
public class Image {

    @Id
    @GeneratedValue
    @Column(name = "img_id")
    private Long imgId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "img_title")
    private String imgTitle;

    @Column(name = "img_type")
    private int imgType;

    @Column(name = "save_folder")
    private String saveFolder;

    @Column(name = "original_file")
    private String originalFile;

    @Column(name = "save_file")
    private String saveFile;

    @Builder
    public Image(Long imgId, Long userId, String imgTitle, int imgType, String saveFolder, String originalFile, String saveFile) {

        this.imgId = imgId;
        this.userId = userId;
        this.imgTitle = imgTitle;
        this.imgType = imgType;
        this.saveFolder = saveFolder;
        this.originalFile = originalFile;
        this.saveFile = saveFile;

        if (imgTitle == null) {
            this.imgTitle = "imgTitle";
        }

    }

}
