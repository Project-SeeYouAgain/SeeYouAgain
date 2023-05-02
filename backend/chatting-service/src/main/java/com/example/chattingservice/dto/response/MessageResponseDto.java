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

    private String Identifier;
    private Long writerId;
    private String nickname;
    private String profileImg;
    private String chat;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
