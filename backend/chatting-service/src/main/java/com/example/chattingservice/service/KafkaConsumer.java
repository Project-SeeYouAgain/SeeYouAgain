package com.example.chattingservice.service;

import com.example.chattingservice.repository.ParticipantRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaConsumer {

    private final ParticipantRepository participantRepository;

    @KafkaListener(topics = "example-participant-topic")
    public void updateProfileImg(String kafkaMessage) {
        log.info("Kafka Message ->" + kafkaMessage);

        // 역직렬화
        Map<Object, Object> map = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        try {
            map = mapper.readValue(kafkaMessage, new TypeReference<Map<Object, Object>>() {});
        } catch (JsonProcessingException ex) {
            ex.printStackTrace();
        }

        Object userIdObj = map.get("userId");
        if (userIdObj instanceof Integer) {
            Integer userIdInt = (Integer) userIdObj;
            Long userId = Long.valueOf(userIdInt);
            participantRepository.updateProfileImg(Long.parseLong(map.get("userId").toString()), (String)map.get("profileImg"));
        }

    }
}
