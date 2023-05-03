package com.example.userservice.service;

import com.example.userservice.dto.request.user.MannerCommentRequestDto;

public interface MannerCommentService {
    void rateUser(Long raterId, MannerCommentRequestDto requestDto, Long userId);
}