package com.example.productservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserClientResponseDto {

    private String email;
    private String nickname;
    private String profileImg;
    private String location;
    private Integer mannerScore;
}
