package com.example.userservice.controller;

import com.example.userservice.dto.BaseResponseDto;
import com.example.userservice.dto.request.user.MannerCommentRequestDto;
import com.example.userservice.dto.request.user.NicknameRequestDto;
import com.example.userservice.dto.request.user.ProfileUpdateRequestDto;
import com.example.userservice.dto.response.user.ProfileResponseDto;
import com.example.userservice.service.AuthService;
import com.example.userservice.service.MannerCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth/manner")
public class MannerCommentController {

    private final MannerCommentService mannerCommentService;

    /**
     * 유저 매너 평가 API입니다.
     *
     * @param request
     * @param requestDto
     * @param userId
     * @return
     */
    @PostMapping("/{userId}")
    public ResponseEntity<BaseResponseDto<?>> rateUser(HttpServletRequest request,
                                                       @RequestBody MannerCommentRequestDto requestDto,
                                                       @PathVariable("userId") Long userId) {
        Long raterId = getUserId(request);
        mannerCommentService.rateUser(raterId, requestDto, userId);
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseDto<>(201, "success"));
    }

    private Long getUserId(HttpServletRequest request) {
        return Long.parseLong(request.getHeader("userId"));
    }

}