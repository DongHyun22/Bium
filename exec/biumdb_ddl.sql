use s09p13c205;

DROP TABLE IF EXISTS `Contest`;
DROP TABLE IF EXISTS `hibernate_sequence`;
DROP TABLE IF EXISTS `Image`;
DROP TABLE IF EXISTS `ContestRoom`;
DROP TABLE IF EXISTS `SNS_User`;
DROP TABLE IF EXISTS `User`;


CREATE TABLE IF NOT EXISTS `User`
(
    `user_id`       BIGINT       NOT NULL,
    `user_email`    VARCHAR(100) NOT NULL,
    `user_pw`       VARCHAR(100) NOT NULL,
    `token`         TEXT         NULL,
    `user_name`     VARCHAR(100) NOT NULL,
    `user_nickname` VARCHAR(100) NOT NULL,
    `user_rank`     INT          NOT NULL DEFAULT 1,
    `today_bium`    BIGINT       NOT NULL DEFAULT 0,
    `top_bium`      BIGINT       NOT NULL DEFAULT 0,
    `total_bium`    BIGINT       NOT NULL DEFAULT 0,
    `is_admin`      TINYINT      NOT NULL DEFAULT 0,
    `create_date`   TIMESTAMP    NOT NULL,
    `modified_date` TIMESTAMP    NOT NULL
    );

CREATE TABLE IF NOT EXISTS `SNS_User`
(
    `sns_id`    BIGINT  NOT NULL,
    `user_id`   BIGINT  NOT NULL,
    `naver_id`  VARCHAR(100) NULL,
    `kakao_id`  VARCHAR(100) NULL
    );

CREATE TABLE IF NOT EXISTS `Contest`
(
    `contest_id`      BIGINT NOT NULL,
    `user_id`         BIGINT NOT NULL,
    `contest_room_id` BIGINT NULL,
    `contest_record`  BIGINT NOT NULL DEFAULT 0
);


CREATE TABLE IF NOT EXISTS `ContestRoom`
(
    `contest_room_id`       BIGINT       NOT NULL,
    `contest_room_title`    VARCHAR(100) NOT NULL,
    `is_start`              TINYINT      NOT NULL DEFAULT 0,
    `contest_room_pw`       VARCHAR(100) NOT NULL DEFAULT '',
    `contest_room_movie`    INT          NOT NULL,
    `cur_people`            INT          NOT NULL DEFAULT 1,
    `max_people`            INT          NOT NULL,
    `contest_create_time`   TIMESTAMP    NOT NULL,
    `contest_modified_date` TIMESTAMP    NOT NULL
    );


CREATE TABLE IF NOT EXISTS `Image`
(
    `img_id`        BIGINT       NOT NULL,
    `user_id`       BIGINT       NOT NULL,
    `img_title`     VARCHAR(100) NOT NULL,
    `img_type`      INT          NOT NULL,
    `save_folder`   VARCHAR(255) NOT NULL,
    `original_file` VARCHAR(255) NOT NULL,
    `save_file`     VARCHAR(255) NOT NULL
    );

ALTER TABLE `User`
    ADD CONSTRAINT `PK_USER` PRIMARY KEY (`user_id`);
ALTER TABLE `Image`
    ADD CONSTRAINT `PK_IMAGE` PRIMARY KEY (`img_id`);
ALTER TABLE `Contest`
    ADD CONSTRAINT `PK_CONTEST` PRIMARY KEY (`contest_id`, `user_id`);
ALTER TABLE `ContestRoom`
    ADD CONSTRAINT `PK_CONTESTROOM` PRIMARY KEY (`contest_room_id`);
ALTER TABLE `Contest`
    ADD CONSTRAINT `FK_User_TO_Contest_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`);

CREATE TABLE IF NOT EXISTS `hibernate_sequence`
(
    `next_val` BIGINT NULL DEFAULT NULL
);

INSERT INTO hibernate_sequence (next_val)
VALUES (1);