package com.example.userservice.controller;

import com.example.userservice.dto.BaseResponseDto;
import com.example.userservice.dto.request.fcm.FCMNotificationRequestDto;
import com.example.userservice.service.FCMNotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class FCMNotificationController {

    private final FCMNotificationService fcmNotificationService;

    @PostMapping("/notification")
    public ResponseEntity<BaseResponseDto<String>> sendNotificationByToken(@RequestBody FCMNotificationRequestDto requestDto) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success", fcmNotificationService.sendNotificationByToken(requestDto)));
    }
}