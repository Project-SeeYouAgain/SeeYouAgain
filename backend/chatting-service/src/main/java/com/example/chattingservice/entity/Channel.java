package com.example.chattingservice.entity;

import com.example.chattingservice.dto.request.ChannelRequestDto;
import com.example.chattingservice.dto.response.ProductClientResponseDto;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "channels")
public class Channel extends TimeStamped {

    @Id
    @Column(name = "channel_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productId;

    private Long ownerId;

    private Long userId;

    private String identifier;

    private String productImg;

    public static Channel of(ChannelRequestDto requestDto, Long userId, String identifier, ProductClientResponseDto productInfo) {
        return Channel.builder()
                .productId(requestDto.getProductId())
                .ownerId(requestDto.getOwnerId())
                .userId(userId)
                .identifier(identifier)
                .productImg(productInfo.getProductImg())
                .build();
    }
}
