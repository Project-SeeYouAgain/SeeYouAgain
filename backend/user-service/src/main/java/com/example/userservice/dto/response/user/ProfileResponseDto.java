package com.example.userservice.dto.response.user;

import com.example.userservice.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileResponseDto {

    private String profileImg;

    private String nickname;

    public static ProfileResponseDto from (User user) {
        return ProfileResponseDto.builder()
                .profileImg(user.getProfileImgUrl())
                .nickname(user.getNickname())
                .build();
    }
}
