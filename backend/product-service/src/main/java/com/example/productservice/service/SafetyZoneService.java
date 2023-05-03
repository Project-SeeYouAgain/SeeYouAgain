package com.example.productservice.service;

import com.example.productservice.dto.response.CctvResponseDto;

import java.util.List;

public interface SafetyZoneService {
    List<CctvResponseDto> getCctvList(String location);
}
