package com.example.chattingservice.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MessageRequestDto {

    private Long channelId;
    private Long userId;
    private String nickname;
    private String chat;
}
