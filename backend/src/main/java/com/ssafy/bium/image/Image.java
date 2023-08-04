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
@AllArgsConstructor
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

}
