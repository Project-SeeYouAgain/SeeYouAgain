package com.example.chattingservice.service;

import com.example.chattingservice.dto.request.MessageRequestDto;
import com.example.chattingservice.dto.response.MessageResponseDto;

import java.util.List;

public interface MessageService {
    MessageResponseDto insertMessage(MessageRequestDto chatDto);
    List<MessageResponseDto> getMessageByChannelId(String identifier, Long firstMessageId);
}
