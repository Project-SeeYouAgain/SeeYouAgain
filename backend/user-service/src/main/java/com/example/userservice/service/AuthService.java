package com.example.userservice.service;

import com.example.userservice.dto.request.fcm.FCMTokenRequestDto;
import com.example.userservice.dto.request.user.NicknameRequestDto;
import com.example.userservice.dto.request.user.ProfileUpdateRequestDto;
import com.example.userservice.dto.response.user.ProfileResponseDto;
import org.springframework.web.multipart.MultipartFile;

public interface AuthService {

    ProfileResponseDto getProfile(Long userId);

    ProfileResponseDto updateProfile(Long userId, ProfileUpdateRequestDto requestDto, MultipartFile profileImg);

    void deleteUser(Long userId);

    String updateNickname(Long userId, NicknameRequestDto requestDto);

    void updateFCMToken(Long userId, FCMTokenRequestDto requestDto);
}