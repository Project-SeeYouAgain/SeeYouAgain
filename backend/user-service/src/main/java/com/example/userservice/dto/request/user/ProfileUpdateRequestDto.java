package com.example.userservice.dto.request.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
public class ProfileUpdateRequestDto {
    private MultipartFile profileImg;
    private String location;
    private String description;
}
