package com.example.chattingservice.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChannelRequestDto {

    private Long productId;

    private Long firstUserId;

    private Long secondUserId;
}
