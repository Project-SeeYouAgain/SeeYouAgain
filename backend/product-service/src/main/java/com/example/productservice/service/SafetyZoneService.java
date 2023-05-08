package com.example.productservice.service;

import com.example.productservice.dto.response.SafetyZoneResponseDto;

import java.util.List;

public interface SafetyZoneService {
    List<SafetyZoneResponseDto> getCctvList(String location);

    List<SafetyZoneResponseDto> getPoliceList(String location);

    List<SafetyZoneResponseDto> getLightList(String location);
}
