package com.example.userservice.service;

import com.example.userservice.dto.request.user.NicknameRequestDto;
import com.example.userservice.dto.response.user.ProfileResponseDto;
import org.springframework.web.multipart.MultipartFile;

public interface AuthService {

    ProfileResponseDto getProfile(Long userId);

    ProfileResponseDto updateProfile(Long userId, MultipartFile profileImg, String location, String description);

    void deleteUser(Long userId);

    String updateNickname(Long userId, NicknameRequestDto requestDto);

//    String updateProfileImg(Long userId, MultipartFile profileImg);

}