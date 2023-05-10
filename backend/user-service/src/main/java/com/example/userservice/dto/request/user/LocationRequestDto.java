package com.example.userservice.dto.request.user;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LocationRequestDto {
    private Float lat;
    private Float lng;
}