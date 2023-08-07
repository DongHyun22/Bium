package com.ssafy.bium.openvidu;

import io.openvidu.java.client.*;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Map;

@Service
@NoArgsConstructor
public class OpenviduService {
    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    public String initializeSession(Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(properties);
        return session.getSessionId();
    }

    public String createConnection(String sessionId, Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            return null;
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        return connection.getToken();
    }
    public String getData(String sessionId) throws OpenViduJavaClientException, OpenViduHttpException{
        System.out.println("------------------------------------------");
        List<Session> list = openvidu.getActiveSessions();
        for (Session s : list){
            System.out.println("세션 : " + s);
        }
        System.out.println("------------------------------------------");
        Session session = openvidu.getActiveSession(sessionId);
        if(session == null){
            System.out.println("세션이 널입니다.");
        }
        else{
            System.out.println(session.toString());
        }
//        System.out.println("session.createdAt()" + session.createdAt());
        System.out.println("------------------------------------------");
        System.out.println(session.getProperties());
        List<Connection> connections = session.getActiveConnections();
        Connection connection = connections.get(0);
        System.out.println(connection);
        System.out.println("------------------------------------------");
        System.out.println("커넥션 투 스트링 " + connection.toString());
        System.out.println("서버 데이터 " + connection.getServerData());
        System.out.println("클라이언트 데이터 " + connection.getClientData());
        System.out.println("connection.activeAt " + connection.activeAt());
        System.out.println(connection.getPublishers());
        System.out.println(connection.getSubscribers());

        return "";
    }
}
