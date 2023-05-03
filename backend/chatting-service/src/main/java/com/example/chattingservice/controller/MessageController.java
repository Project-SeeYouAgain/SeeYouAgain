package com.example.chattingservice.controller;

import com.example.chattingservice.dto.request.MessageRequestDto;
import com.example.chattingservice.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    private final SimpMessagingTemplate template;

    @MessageMapping("/chat")
    public void sendMessage(MessageRequestDto chatDto) {
        messageService.insertMessage(chatDto);
        template.convertAndSend("/sub/chat/" + chatDto.getIdentifier(), chatDto);
    }
}
