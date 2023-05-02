package com.example.userservice.dto.request.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Getter
@NoArgsConstructor
public class ProfileUpdateRequestDto {
    private MultipartFile profileImg;
    private String location;
    private String description;
}
