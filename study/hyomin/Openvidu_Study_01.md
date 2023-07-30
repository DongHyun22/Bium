# Openvidu 사용법 정리

## 도커 데스크탑 설치

[Install Docker Engine](https://docs.docker.com/engine/install/#server)

1. Docker Desktop를 컴퓨터 버전(Window, Mac 등)에 맞게 설치한다
2. 설치하면 WSL 뭐… 깔라고.. 알림창이 뜨면.. 알림창에 뜬 링크 들어가서 업데이트 하라고 하면 그거 그대로 실행!

## cmd에서 도커 실행, openvidu-library-react의 문서를 따라한다

[openvidu-library-react - OpenVidu Docs](https://docs.openvidu.io/en/stable/tutorials/openvidu-library-react/)

1. cmd 창에서 위의 링크에 따라 도커를 설치한다

```java
# WARNING: this container is not suitable for production deployments of OpenVidu
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.28.0
```

1. 도커 데스크탑을 확인해보면 도커가 생긴다


1. openvidu를 클론 받는다
    
    ```java
    git clone https://github.com/OpenVidu/openvidu-tutorials.git -b v2.28.0
    cd openvidu-tutorials/openvidu-basic-java
    ```
    
2. openvidu 서버 파일을 실행시킨다 ( openvidu-basic-java )
    - 명령어로 실행할 수 있다
        
        ```java
        mvn spring-boot:run
        ```
        
    - IntelliJ에서 프로젝트를 실행할 수 있다
3. openvidu 클라이언트 파일을 실행시킨다 (openvidu-library-react )
    
    ```java
    npm -v
    ```
    
    - VS Code나 IntelliJ에서 openvidu-library-react 를 실행한다
        - 터미널에서 `npm install` → `npm start` 명령어를 실행시킨다
    - 명령어로 실행할 수 있다
        
        ```java
        # Using the same repository openvidu-tutorials from step 2
        
        cd openvidu-tutorials/openvidu-library-react
        npm install
        npm start
        ```
        
    
    <aside>
    🌱 아래와 같은 문제가 생길 수 있음!!!!
    
    ****error:03000086:digital envelope routines::initialization error axios****
    
    openvidu-library-react에서 필요로 하는 노드의 버전이 낮아서 만약, 최신 버전의 노드가 컴퓨터에 미리 설치되어있었다면 `npm start`에서 제대로 실행이 되지 않고 위와 같은 문제가 생길 수 있음
    
    [https://github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows)
    깃허브 링크 대로 `nvm을 다운`받고 (1) `nvm install 원하는 버전` 을 클릭해 다운(2)받은 후 `nvm use 원하는 버전` (3)을 적용시킨다
    
    </aside>
    

## 웹 페이지에서 실행

1. 웹 페이지에 [http://localhost:3000/](http://localhost:3000/)를 들어가면 화면이 나온다
2. 같은 Session ID를 입력해서 여러 탭에서 들어간다면 함께 화상미팅을 할 수 있다
3. 현재 `도커`와, openvidu 서버 파일(`openvidu-basic-java`)와 openvidu클라이언트 파일(`openvidu-library-react`)가 실행되고 있다.
