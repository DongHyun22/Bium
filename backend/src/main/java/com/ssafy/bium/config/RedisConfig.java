package com.ssafy.bium.config;

import com.ssafy.bium.gameroom.request.GameRoomDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    @Value("${spring.data.redis.host}")
    private String host;

    @Value("${spring.data.redis.port}")
    private int port;

//    @Value("${spring.data.redis.password}")
//    private int password;

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        RedisStandaloneConfiguration redisConfiguration = new RedisStandaloneConfiguration();
        redisConfiguration.setHostName(host);
        redisConfiguration.setPort(port);
//        redisConfiguration.setPassword(password);

        return new LettuceConnectionFactory(redisConfiguration);
    }

    @Primary
    @Bean
    // TODO: 2023-07-26 (026)  GaneRoomDto -> Object로 변경하기
    public RedisTemplate<String, GameRoomDto> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, GameRoomDto> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory);

        // String 타입의 key를 사용하므로 StringRedisSerializer를 사용합니다.
        redisTemplate.setKeySerializer(new StringRedisSerializer());

        // 값은 JSON 형식으로 직렬화하여 저장합니다.
        redisTemplate.setValueSerializer(new GenericJackson2JsonRedisSerializer());

        // Hash 자료구조를 사용할 때 필요한 설정입니다.
        redisTemplate.setHashKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashValueSerializer(new GenericJackson2JsonRedisSerializer());

        // RedisTemplate을 초기화합니다.
        redisTemplate.afterPropertiesSet();

        return redisTemplate;
    }

}