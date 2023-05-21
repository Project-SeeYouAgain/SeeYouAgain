package com.example.userservice.service;

import com.example.userservice.dto.request.chatting.ProfileImgRequestDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;

    public void send(String topic, ProfileImgRequestDto requestDto) {
        ObjectMapper mapper = new ObjectMapper();
        String jsonInString = "";
        try {
            jsonInString = mapper.writeValueAsString(requestDto);
        } catch (JsonProcessingException ex) {
            ex.printStackTrace();
        }

        kafkaTemplate.send(topic, jsonInString);
        log.info("Kafka Producer sent data from User microservice: " + requestDto);
    }
}
