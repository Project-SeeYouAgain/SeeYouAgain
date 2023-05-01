package com.example.userservice.service;

import com.example.userservice.dto.request.user.MannerCommentRequestDto;
import com.example.userservice.dto.request.user.NicknameRequestDto;
import com.example.userservice.dto.request.user.ProfileUpdateRequestDto;
import com.example.userservice.dto.response.user.ProfileResponseDto;
import org.springframework.web.multipart.MultipartFile;

public interface AuthService {

    ProfileResponseDto getProfile(Long userId);

    ProfileResponseDto updateProfile(Long userId, ProfileUpdateRequestDto requestDto);

    void deleteUser(Long userId);

    String updateNickname(Long userId, NicknameRequestDto requestDto);

    void rateUser(Long raterId, MannerCommentRequestDto requestDto, Long userId);

    void addCart(Long userId, Long productId);

    void deleteCart(Long userId, Long productId);

    String updateProfileImg(Long userId, MultipartFile profileImg);

}