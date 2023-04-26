package com.example.userservice.service;

import com.example.userservice.dto.request.user.*;
import com.example.userservice.dto.response.user.LoginResponseDto;
import com.example.userservice.dto.response.user.TokenResponseDto;
import com.example.userservice.dto.response.user.UserResponseDto;

import javax.servlet.http.HttpServletRequest;

public interface UserService {
    UserResponseDto join(SignUpRequestDto requestDto);
    LoginResponseDto login(LoginRequestDto requestDto);


    void nicknameCheck(String nickname);

    UserResponseDto getUserInfo(Long userId);

    TokenResponseDto refresh(HttpServletRequest request);
}
