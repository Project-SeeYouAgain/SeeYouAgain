package com.example.chattingservice.dto.response;

import com.example.chattingservice.entity.Channel;
import com.example.chattingservice.entity.Message;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChannelResponseDto implements Comparable<ChannelResponseDto> {

    private String identifier;

    private String nickname;

    private String profileImg;

    private String location;

    private String productImg;

    private String lastMessage;

    private LocalDateTime lastMessageDate;

    private Integer notReadMessageSize;

    public static ChannelResponseDto of(Channel channel, UserClientResponseDto responseDto, Message message, Integer notReadMessageSize) {
        return ChannelResponseDto.builder()
                .identifier(channel.getIdentifier())
                .nickname(responseDto.getNickname())
                .profileImg(responseDto.getProfileImg())
                .location(responseDto.getLocation())
                .productImg(channel.getProductImg())
                .lastMessage(message.getChat())
                .lastMessageDate(message.getCreatedAt())
                .notReadMessageSize(notReadMessageSize)
                .build();
    }

    @Override
    public int compareTo(ChannelResponseDto o) {
        return o.getLastMessageDate().compareTo(this.getLastMessageDate());
    }
}
