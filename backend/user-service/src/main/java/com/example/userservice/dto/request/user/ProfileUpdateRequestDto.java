package com.example.userservice.dto.request.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Getter
@NoArgsConstructor
public class ProfileUpdateRequestDto {
    MultipartFile profileImg;
    String location;
    String description;
}
