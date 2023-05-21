package com.example.userservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class RedisService {

    private final RedisTemplate redisTemplate;

    // 키-벨류 설정
    public void setValues(String token, Long userId){
        ValueOperations<String, String> values = redisTemplate.opsForValue();
        values.set(userId.toString(), token, Duration.ofMinutes(14 * 24 * 60));
    }

    // 키값으로 벨류 가져오기
    public String getValues(Long userId){
        ValueOperations<String, String> values = redisTemplate.opsForValue();
        return values.get(userId.toString());
    }

    // 키-벨류 삭제
    public void delValues(Long userId) {
        redisTemplate.delete(userId.toString());
    }
}
