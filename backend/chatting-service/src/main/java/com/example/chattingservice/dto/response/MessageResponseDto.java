package com.example.chattingservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessageResponseDto {

    private Long messageId;
    private Long writerId;
    private String profileImg;
    private String chat;
    private Boolean isRead;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
