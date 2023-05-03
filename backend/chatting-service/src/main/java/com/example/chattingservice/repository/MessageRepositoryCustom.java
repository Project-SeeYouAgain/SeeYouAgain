package com.example.chattingservice.repository;

import com.example.chattingservice.dto.response.MessageResponseDto;

import java.util.List;

public interface MessageRepositoryCustom {

    List<MessageResponseDto> findLatestMessageList(String identifier, Long firstMessageId);
}
