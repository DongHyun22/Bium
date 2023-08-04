# open jdk java11 버전의 환경
FROM openjdk:11-jdk

# JAR_FILE 변수 정의 -> 기본적으로 jar file 이 2개이기 때문에 이름을 특정해야 함
ARG JAR_FILE=./build/libs/bium-0.0.1-SNAPSHOT.jar

# JAR 파일 메인 디렉토리에 복사
COPY ${JAR_FILE} app.jar

EXPOSE 8080

# 시스템 진입점 정의
ENTRYPOINT ["java","-jar","/app.jar"]
