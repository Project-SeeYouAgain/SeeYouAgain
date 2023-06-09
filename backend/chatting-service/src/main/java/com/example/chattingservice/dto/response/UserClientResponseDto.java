package com.example.chattingservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserClientResponseDto {
    private Long userId;
    private String email;
    private String nickname;
    private String profileImg;
    private String location;
    private Integer mannerScore;
}
