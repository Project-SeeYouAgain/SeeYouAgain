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
public class UserResponseDto {

    private Long userId;

    private String email;

    private String nickname;

    private String profileImg;

    private String location;

    private Integer mannerScore;

    public static UserResponseDto from (User user) {
        return UserResponseDto.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .profileImg(user.getProfileImgUrl())
                .location(user.getLocation())
                .mannerScore(user.getMannerScore())
                .build();
    }
}
