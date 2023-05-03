package com.example.userservice.dto.response.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponseDto {

    private UserResponseDto userInfo;

    private String accessToken;

    private String refreshToken;

    public static LoginResponseDto of (UserResponseDto userInfo, String accessToken, String refreshToken) {
        return LoginResponseDto.builder()
                .userInfo(userInfo)
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }
}
