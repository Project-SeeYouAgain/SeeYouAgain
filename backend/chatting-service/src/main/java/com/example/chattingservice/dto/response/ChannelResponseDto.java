package com.example.chattingservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChannelResponseDto {

    private Long channelId;

    private String nickname;

    private String profileImg;

    private String location;

    private String lastMessage;

    private String productImg;

    private String lastMessageDate;
}
