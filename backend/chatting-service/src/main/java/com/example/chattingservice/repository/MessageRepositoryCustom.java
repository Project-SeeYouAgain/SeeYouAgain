package com.example.chattingservice.repository;

import com.example.chattingservice.dto.response.MessageResponseDto;
import com.example.chattingservice.entity.Message;

import java.util.List;

public interface MessageRepositoryCustom {

    List<Message> findNotReadMessageList(String identifier, Long userId, Long lastMessageId);

    List<MessageResponseDto> findLatestMessageList(String identifier, Long firstMessageId);
}
