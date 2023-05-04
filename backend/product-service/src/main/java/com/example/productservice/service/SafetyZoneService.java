package com.example.productservice.service;

import com.example.productservice.dto.request.SafetyZoneRequestDto;
import com.example.productservice.dto.response.SafetyZoneResponseDto;

import java.util.List;

public interface SafetyZoneService {
    List<SafetyZoneResponseDto> getCctvList(SafetyZoneRequestDto safetyZoneRequestDto);
    List<SafetyZoneResponseDto> getPoliceList(SafetyZoneRequestDto safetyZoneRequestDto);
    List<SafetyZoneResponseDto> getLightList(SafetyZoneRequestDto safetyZoneRequestDto);
}
