package com.example.userservice.controller;

import com.example.userservice.dto.BaseResponseDto;
import com.example.userservice.dto.request.fcm.FCMTokenRequestDto;
import com.example.userservice.dto.request.user.MannerCommentRequestDto;
import com.example.userservice.dto.request.user.NicknameRequestDto;
import com.example.userservice.dto.request.user.ProfileUpdateRequestDto;
import com.example.userservice.dto.response.user.ProfileResponseDto;
import com.example.userservice.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    /**
     * 프로필을 가져오는 API입니다.
     *
     * @param userId
     * @return
     */
    @GetMapping("/profile/{userId}")
    public ResponseEntity<BaseResponseDto<ProfileResponseDto>> getProfile(@PathVariable("userId") Long userId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success", authService.getProfile(userId)));
    }

    /**
     * 본인 프로필을 가져오는 API입니다.
     *
     * @param request
     * @return
     */
    @GetMapping("/profile")
    public ResponseEntity<BaseResponseDto<ProfileResponseDto>> getMyProfile(HttpServletRequest request) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success", authService.getProfile(getUserId(request))));
    }

    /**
     * 프로필 변경 API입니다.
     *
     * @param request
     */
    @PatchMapping("/profile")
    public ResponseEntity<BaseResponseDto<ProfileResponseDto>> updateProfile(HttpServletRequest request,
                                                                             @RequestPart ProfileUpdateRequestDto requestDto,
                                                                             @RequestPart(required = false) MultipartFile profileImg) {
        ProfileResponseDto responseDto = authService.updateProfile(getUserId(request), requestDto, profileImg);
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseDto<>(200, "success", responseDto));
    }

    /**
     * 회원탈퇴 API입니다.
     *
     * @param request
     */
    @DeleteMapping
    public ResponseEntity<BaseResponseDto<?>> deleteUser(HttpServletRequest request) {
        authService.deleteUser(getUserId(request));
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new BaseResponseDto<>(204, "success"));
    }

    /**
     * 닉네임을 변경하는 API입니다.
     *
     * @param request
     * @param requestDto
     */
    @PatchMapping("/nickname")
    public ResponseEntity<BaseResponseDto<String>> updateNickname(HttpServletRequest request,
                                                                  @RequestBody NicknameRequestDto requestDto) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success", authService.updateNickname(getUserId(request), requestDto)));
    }

    /**
     * firebase token을 변경하는 API입니다.
     *
     * @param request
     * @param requestDto
     */
    @PatchMapping("/firebase-token")
    public ResponseEntity<BaseResponseDto<?>> updateFCMToken(HttpServletRequest request,
                                                             @RequestBody FCMTokenRequestDto requestDto) {

        authService.updateFCMToken(getUserId(request), requestDto);

        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseDto<>(200, "success"));
    }

    private Long getUserId(HttpServletRequest request) {
        return Long.parseLong(request.getHeader("userId"));
    }

}