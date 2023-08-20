![스크린샷 2023-08-19 152257.png](README-assets/c8289444305335adbf43f2cf5c6faf4e81eb45ce.png)

###### 배포 주소

> 📌 https://i9c205.p.ssafy.io

# 📌서비스 소개

## 서비스 설명

### 개요

- 서비스 명 : 비움
  - “ ((주로 ‘마음, 가슴’ 따위와 함께 쓰여)) 욕심이나 집착 따위의 어지러운 생각을 없애다. “ 뜻의 비우다의 명사형과 “긴 소리를장음 부호를 합친 이름
  - 서비스를 통해 생각과 걱정을 비우고 힐링을 채우는 온라인 공간을 제공하고자 하는 의미
- 프로젝트 명 : "심신 안정을 위한 화상 게임" 서비스

### 타겟

> 바쁜 일상 속 잠깐의 쉼과 생각 비우기가 필요한 사람들

# 📌기획 배경

## 배경

- 평소에 얼마나 많은 스트레스를 받으며 살고 있는지를 평가해본 결과, 2명 중 1명(47.9%)이 일상 속 스트레스 수준이 높은 편이라고 응답
  출처 : [데일리팝(http://www.dailypop.kr)](https://www.dailypop.kr/news/articleView.html?idxno=53913)
- 아무것도 하지 않고 아무 생각도 하지 않는 순간이 오히려 사람들의 마음을 위로한다. → 새로운 정신 건강 관리법으로 각광받고 있다.
- 멍 때리기 대회
  - 2014년부터 개최한 대회로 혼자만 멍 때리는 것이 불안한 사람들에게 다 같이 멍을 때리자고 권유하자는 의미가 있다
  - 멍 때리기가 시간 낭비라는 고정관념을 뛰어넘어 마음을 다스리는 방법으로 인정받고 있음
- 자신만의 시간을 보내고 싶어하는 사람들이 증가함
  - 검색 창에 '멍 때리기 좋은 곳'을 검색하면 한적한 관광지, 숙박업체가 추천된다.
  - SNS에서는 조용한 분위기가 일품인 멍 때리기 좋은 곳을 서로 공유하는 경우도 생겨나고 있다.
  - 대한민국 문화체육관광부와 소속기관이 운영하는 문화포털에서는 '서울에서 멍 때리기 좋은 곳'이라는 제목으로 도시 속 색다른 휴식 공간을 소개하며 사람들에게 신선한 정보를 제공

## 목적

- 일상 생활 안에서 멍을 때리며 사람들의 정신 건강 관리를 돕기 위함
- 장소의 제약을 벗어나 영상을 통해 멍 때릴 수 있는 환경을 제공
- 게임과 대회에 참여하며 사람들과 함께 멍을 때릴 수 있는 기회를 제공

## 의의

- 누구든지 접속해서 참여할 수 있는 생각 비우기 게임
- 리프레시 하기 위한 수단

# 📌 데모

###### 필수 사항

```bash
Node.js 18.16.1
SpringBoot 2.4.5
npm 9.5.1
```

###### 권고 사항

- Chorme Browser

###### 설치

```bash
# git clone
git clone https://lab.ssafy.com/s09-webmobile1-sub2/S09P12C205.git
```

###### Back-End

```bash
# backend 폴더로 이동
cd backend
```

###### Front-End

```bash
# frontend 폴더로 이동
cd frontend
npm i  
npm start
```

# 📌기능 소개

## 주요 기능

⭐ 실시간 라이브 스트리밍 비움

⭐ 회원 관리 (게임 기록 관리, 회원 정보 관리, 랭크 조회)

⭐ face-api.js 연동 - 카메라 이탈 인지, 표정 인지

## 세부 기능

- 메인
  - 게임방 목록, 생성
  - 배경 영상과 개인 웹캠 영상 송출
  - 타이머
- 회원
  - 자체 로그인
  - 비밀번호 찾기
  - 비움 기록 확인
  - 마이페이지

# 📌기술 스택

##### Back-End

<div>
<img src="https://img.shields.io/badge/Java [11.0.15]-007396?style=for-the-badge&logo=java&logoColor=white" />
<img src="https://img.shields.io/badge/Spring Boot [2.7.14]-6DB33F?style=for-the-badge&logo=Spring Boot&logoColor=white" />
<img src="https://img.shields.io/badge/Gradle [8.2.1]-02303A?style=for-the-badge&logo=gradle&logoColor=white" />
</div>

##### Front-End

<div>
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> 
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white"> 
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white" />
<img src="https://img.shields.io/badge/node.js [18.16.1]-339933?style=for-the-badge&logo=Node.js&logoColor=white">
</div>

##### DataBase

<img src="https://img.shields.io/badge/mariaDB [11.2.0 Alpha]-003545?style=for-the-badge&logo=mariaDB&logoColor=white">
<img src="https://img.shields.io/badge/redis [7.0.12]-DC382D?style=for-the-badge&logo=redis&logoColor=white">

##### VCS

<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white" />
<img src="https://img.shields.io/badge/GitLab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white" />


##### IDE

<img src="https://img.shields.io/badge/Visual Studio Code [1.80.1]-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white" />
<img src="https://img.shields.io/badge/IntelliJ IDEA [2023.1.4]-000000?style=for-the-badge&logo=intellijidea&logoColor=white" />

##### CI/CD

<img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white"> 
<img src="https://img.shields.io/badge/ec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white"> 
<img src="https://img.shields.io/badge/Docker [24.0.4]-2496ED?style=for-the-badge&logo=docker&logoColor=white">

##### Environment

<div>
<img src="https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jira&logoColor=white"> 
<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"> 
<img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"> 
<img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"> 
<img src="https://img.shields.io/badge/Mattermost [5.3.1]-0058CC?style=for-the-badge&logo=mattermost&logoColor=white" />
<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" />
</div>

# 📌프로젝트 진행 및 산출물

#### 프로젝트 개발 기간

2023.07.17 ~ 2023.08.18

#### 프로젝트 산출물

##### 1. Figma

[Figma](https://www.figma.com/file/0xwiJEVbPtZn1yo7yaQfn7/%EB%B9%84%CB%90%EC%9B%80?type=design&node-id=0-1&mode=design&t=q3l7gFRnTTfb5mJC-0)

##### 2. ERD

[ER Diagram](https://www.erdcloud.com/d/frF6qL8QF29gzuymg)

##### 3. API 설계서

[API 명세서](https://www.notion.so/API-URL-aecc36ea3f3d4a48a830f0fe8a689d4a?pvs=21)

##### 4. 요구사항 정의서

[요구사항 정의서](https://docs.google.com/spreadsheets/d/1NY0yTh26FWAF4gvOKL72EtD5HL4vhLlK1UJVjDhHlrQ/edit#gid=283207649)

# 📌개발 멤버

## 개발팀 소개

| 손효민                                                                                                                                 | 김동현                                                                                                                                 | 연주원                                                                                                                                 |
|:-----------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------:|
| <img title="" src="README-assets/SonHyoMin00.png" alt="" width="188" height="">                        | <img title="" src="README-assets/DongHyun22.png" alt="" width="188">                                  | <img title="" src="README-assets/joo1yeon.jpg" alt="" width="188">                                  |
| [<img title="" src="README-assets/SonHyoMin00.png" alt="Git" width="75">](https://github.com/sonhyomin00) | [<img title="" src="README-assets/DongHyun22.png=" alt="Git" width="75">](https://github.com/DongHyun22) | [<img title="" src="README-assets/joo1yeon" alt="Git" width="75">](https://github.com/joo1yeon) |
| **팀장**, BE-Leader                                                                                                                   | BE                                                                                                                                  | BE                                                                                                                                  |

| 이지혁                                                                                                                                 | 이정찬                                                                                                                                 | 최지수                                                                                                                                 |
|:-----------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------:|
| <img title="" src="README-assets/illu1996.png" alt="" width="188">                                  | <img title="" src="README-assets/" alt="" width="188">                                  | <img title="" src="README-assets/" alt="" width="188">                                  |
| [<img title="" src="README-assets/" alt="Git" width="75">](https://github.com/illu1996) | [<img title="" src="README-assets/" alt="Git" width="75">](https://github.com/illu1996) | [<img title="" src="README-assets/" alt="Git" width="75">](https://github.com/illu1996) |
| FE-Leader                                                                                                                           | FE                                                                                                                                  | FE                                                                                                                                  |
