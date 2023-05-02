package com.example.userservice.service;

import com.example.userservice.dto.request.user.LocationRequestDto;
import com.example.userservice.dto.response.user.LocationResponseDto;

public interface LocationService {
    void updateLocation(Long userId, LocationRequestDto requestDto);
    LocationResponseDto getLocationInfo(Long id);
    void deleteLocation(Long userId);
}
