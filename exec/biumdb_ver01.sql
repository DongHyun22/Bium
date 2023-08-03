-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema biumdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema biumdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `biumdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `biumdb` ;

-- -----------------------------------------------------
-- Table `biumdb`.`authority`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biumdb`.`authority` (
  `authority_name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`authority_name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `biumdb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biumdb`.`user` (
  `user_id` BIGINT NOT NULL,
  `user_email` VARCHAR(100) NOT NULL,
  `user_pw` VARCHAR(100) NOT NULL,
  `token` TEXT NULL DEFAULT NULL,
  `user_name` VARCHAR(100) NOT NULL,
  `user_nickname` VARCHAR(100) NOT NULL,
  `user_rank` INT NOT NULL DEFAULT '1' COMMENT '브론즈 메달-> 1, 다이아->7',
  `today_bium` BIGINT NOT NULL DEFAULT '0',
  `top_bium` BIGINT NOT NULL DEFAULT '0',
  `total_bium` BIGINT NOT NULL DEFAULT '0',
  `is_admin` TINYINT NOT NULL DEFAULT '0' COMMENT '1 - 관리자, 0 - 유저',
  `create_date` TIMESTAMP NOT NULL,
  `modified_date` TIMESTAMP NOT NULL,
  `activated` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `biumdb`.`contest`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biumdb`.`contest` (
  `contest_id` BIGINT NOT NULL,
  `user_id` BIGINT NOT NULL,
  `contest_room_id` BIGINT NULL DEFAULT NULL,
  `contest_record` BIGINT NOT NULL DEFAULT '0',
  PRIMARY KEY (`contest_id`, `user_id`),
  INDEX `FK_User_TO_Contest_1` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FK_User_TO_Contest_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `biumdb`.`user` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `biumdb`.`contestroom`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biumdb`.`contestroom` (
  `contest_room_id` BIGINT NOT NULL,
  `contest_room_title` VARCHAR(100) NOT NULL,
  `is_start` TINYINT NOT NULL DEFAULT '0' COMMENT '1 - 대회 중, 0 - 대기 중',
  `contest_room_pw` VARCHAR(100) NOT NULL DEFAULT '' COMMENT 'default: \"\"',
  `contest_room_movie` INT NOT NULL,
  `cur_people` INT NOT NULL DEFAULT '1',
  `max_people` INT NOT NULL,
  `contest_create_time` TIMESTAMP NOT NULL,
  `contest_modified_date` TIMESTAMP NOT NULL,
  PRIMARY KEY (`contest_room_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `biumdb`.`hibernate_sequence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biumdb`.`hibernate_sequence` (
  `next_val` BIGINT NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `biumdb`.`image`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biumdb`.`image` (
  `img_id` BIGINT NOT NULL,
  `user_id` BIGINT NOT NULL,
  `img_title` VARCHAR(100) NOT NULL,
  `img_type` INT NOT NULL COMMENT '1 - 프로필, 2 - 방해',
  `save_folder` VARCHAR(255) NOT NULL,
  `original_file` VARCHAR(255) NOT NULL,
  `save_file` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`img_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `biumdb`.`sns_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biumdb`.`sns_user` (
  `sns_id` BIGINT NOT NULL,
  `user_id` BIGINT NOT NULL,
  `naver_id` VARCHAR(100) NULL DEFAULT NULL,
  `kakao_id` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`sns_id`, `user_id`),
  INDEX `FK_User_TO_SNS_User_1` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FK_User_TO_SNS_User_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `biumdb`.`user` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `biumdb`.`user_authority`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biumdb`.`user_authority` (
  `user_id` BIGINT NOT NULL,
  `authority_name` VARCHAR(100) NULL DEFAULT NULL,
  INDEX `authority_name` (`authority_name` ASC) VISIBLE,
  INDEX `FKpqlsjpkybgos9w2svcri7j8xy` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FKpqlsjpkybgos9w2svcri7j8xy`
    FOREIGN KEY (`user_id`)
    REFERENCES `biumdb`.`user` (`user_id`),
  CONSTRAINT `user_authority_ibfk_1`
    FOREIGN KEY (`authority_name`)
    REFERENCES `biumdb`.`authority` (`authority_name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
