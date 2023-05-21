package com.example.chattingservice.dto.response;

import com.example.chattingservice.entity.Channel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChannelDetailResponseDto {

    private Long productId;

    private String productImg;

    private String title;

    private Integer price;

    private Long userId;

    private String nickname;

    private Integer mannerScore;

    private Boolean productState;

    private Boolean type;

    public static ChannelDetailResponseDto of(Channel channel, ProductClientResponseDto productResponseDto, UserClientResponseDto userResponseDto) {
        return ChannelDetailResponseDto.builder()
                .productId(channel.getProductId())
                .productImg(productResponseDto.getProductImg())
                .title(productResponseDto.getTitle())
                .price(productResponseDto.getPrice())
                .userId(userResponseDto.getUserId())
                .nickname(userResponseDto.getNickname())
                .mannerScore(userResponseDto.getMannerScore())
                .productState(productResponseDto.getProductState())
                .type(productResponseDto.getType())
                .build();
    }
}