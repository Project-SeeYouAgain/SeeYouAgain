package com.example.chattingservice.service;

import com.example.chattingservice.dto.request.MessageRequestDto;
import com.example.chattingservice.dto.response.MessageResponseDto;
import com.example.chattingservice.entity.Message;
import com.example.chattingservice.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService{

    private final MessageRepository messageRepository;

    @Override
    @Transactional
    public void insertMessage(MessageRequestDto chatDto) {
        Message message = Message.from(chatDto);
        messageRepository.save(message);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MessageResponseDto> getMessageByChannelId(Long channelId, Long lastMessageId) {
        return null;
    }
}
