package com.example.chattingservice.dto.response;

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
public class MessageResponseDto {

    private Long messageId;
    private Long writerId;
    private String profileImg;
    private String chat;
    private Boolean isRead;
    private Boolean isImage;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static MessageResponseDto from(Message message) {
        return MessageResponseDto.builder()
                .messageId(message.getId())
                .writerId(message.getParticipant().getUserId())
                .profileImg(message.getParticipant().getProfileImg())
                .chat(message.getChat())
                .isRead(message.getIsRead())
                .isImage(message.getIsImage())
                .createdAt(message.getCreatedAt())
                .updatedAt(message.getUpdatedAt())
                .build();
    }
}
