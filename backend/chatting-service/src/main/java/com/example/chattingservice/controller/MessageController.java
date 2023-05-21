package com.example.chattingservice.controller;

import com.example.chattingservice.dto.BaseResponseDto;
import com.example.chattingservice.dto.request.MessageRequestDto;
import com.example.chattingservice.dto.response.MessageResponseDto;
import com.example.chattingservice.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    private final SimpMessagingTemplate template;

    @MessageMapping("/chat")
    public void sendMessage(MessageRequestDto chatDto) {
        MessageResponseDto messageResponseDto = messageService.insertMessage(chatDto);
        template.convertAndSend("/sub/chat/" + chatDto.getIdentifier(), messageResponseDto);
    }

    @PostMapping("/auth/chatImage")
    public ResponseEntity<BaseResponseDto<String>> saveChatImage(@RequestPart MultipartFile chatImage) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new BaseResponseDto<>(201, "success", messageService.saveChatImage(chatImage)));
    }
}
