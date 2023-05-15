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

    private Boolean isRead;

    private Boolean isImage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "participant_id")
    private Participant participant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "channel_id")
    private Channel channel;

    public static Message of(MessageRequestDto requestDto, Channel channel, Participant participant, Boolean isRead) {
        return Message.builder()
                .chat(requestDto.getChat())
                .isRead(isRead)
                .isImage(requestDto.getIsImage())
                .participant(participant)
                .channel(channel)
                .build();
    }

    public void updateIsRead() {
        this.isRead = true;
    }
}
