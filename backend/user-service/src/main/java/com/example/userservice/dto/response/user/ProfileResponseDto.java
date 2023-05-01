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
    private String location;
    private String description;

    public static ProfileResponseDto from (User user) {
        return ProfileResponseDto.builder()
                .profileImg(user.getProfileImgUrl())
                .nickname(user.getNickname())
                .location(user.getLocation())
                .description(user.getDescription())
                .build();
    }
}
