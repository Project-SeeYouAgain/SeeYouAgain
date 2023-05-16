package com.example.userservice.dto.request.fcm;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FCMTokenRequestDto {
    private String firebaseToken;
}