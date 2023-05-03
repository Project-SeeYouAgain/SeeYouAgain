package com.example.productservice.service;

import com.example.productservice.dto.response.CctvResponseDto;
import com.example.productservice.dto.response.LightResponseDto;
import com.example.productservice.dto.response.PoliceResponseDto;

import java.util.List;

public interface SafetyZoneService {
    List<CctvResponseDto> getCctvList(String location);
    List<PoliceResponseDto> getPoliceList(String location);
    List<LightResponseDto> getLightList(String location);
}
