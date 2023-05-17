package com.example.chattingservice.entity;

import com.example.chattingservice.dto.request.ChannelRequestDto;
import com.example.chattingservice.dto.response.UserClientResponseDto;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "participants")
public class Participant extends TimeStamped {

    @Id
    @Column(name = "participant_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "channel_id")
    private Channel channel;

    private Long userId;

    private String nickname;

    private String profileImg;

    private String location;

    private Boolean isOut;

    private Long lastReadMessageId;

    private int readMessageSize;

    public static Participant of(Channel channel,
                                 Long userId,
                                 UserClientResponseDto responseDto,
                                 boolean isOut) {

        return Participant.builder()
                .channel(channel)
                .userId(userId)
                .nickname(responseDto.getNickname())
                .profileImg(responseDto.getProfileImg())
                .location(responseDto.getLocation())
                .isOut(isOut)
                .lastReadMessageId(0L)
                .readMessageSize(0)
                .build();
    }

    public void updateIsOut(Boolean isOut) {
        this.isOut = isOut;
    }

    public void updateReadMessageSize(Integer readMessageSize) {
        this.readMessageSize = readMessageSize;
    }

    public void plusReadMessageSize() {
        this.readMessageSize += 1;
    }

    public void updateLastReadMessageId(Long lastReadMessageId) {
        this.lastReadMessageId = lastReadMessageId;
    }
}
