package com.example.chattingservice.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MessageRequestDto {

    private String identifier;
    private Long writerId;
    private String nickname;
    private String chat;
}
