package com.example.chattingservice.entity;

import com.example.chattingservice.dto.request.MessageRequestDto;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "messages")
public class Message extends TimeStamped {

    @Id
    @Column(name = "message_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String chat;

    private Long writerId;

    private String nickname;

    private Long channelId;

    public static Message from(MessageRequestDto requestDto) {
        return Message.builder()
                .chat(requestDto.getChat())
                .writerId(requestDto.getWriterId())
                .nickname(requestDto.getNickname())
                .channelId(requestDto.getChannelId())
                .build();
    }
}
