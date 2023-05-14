package com.example.chattingservice.service;

import com.example.chattingservice.dto.request.MessageRequestDto;
import com.example.chattingservice.dto.response.MessageResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MessageService {
    MessageResponseDto insertMessage(MessageRequestDto chatDto);
    List<MessageResponseDto> getMessageByChannelId(String identifier, Long firstMessageId);

    String saveChatImage(MultipartFile chatImage);
}
