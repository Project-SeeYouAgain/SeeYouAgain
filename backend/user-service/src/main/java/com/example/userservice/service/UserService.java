package com.example.userservice.service;

import com.example.userservice.dto.response.user.TokenResponseDto;
import com.example.userservice.dto.response.user.UserResponseDto;

import javax.servlet.http.HttpServletRequest;

public interface UserService {

    UserResponseDto getUserInfo(Long userId);

    TokenResponseDto refresh(HttpServletRequest request);
}
