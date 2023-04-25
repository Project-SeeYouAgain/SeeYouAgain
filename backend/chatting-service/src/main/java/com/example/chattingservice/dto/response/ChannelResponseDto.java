package com.example.chattingservice.dto.response;

import com.example.chattingservice.entity.Channel;
import com.example.chattingservice.entity.Message;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

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

    private LocalDateTime lastMessageDate;

    public static ChannelResponseDto of(Channel channel, UserClientResponseDto responseDto, Message message) {
        return ChannelResponseDto.builder()
                .channelId(channel.getId())
                .nickname(responseDto.getNickname())
                .profileImg(responseDto.getProfileImg())
                .location(responseDto.getLocation())
                .lastMessage(message.getChat())
                .lastMessageDate(message.getCreatedAt())
                .build();
    }
}
