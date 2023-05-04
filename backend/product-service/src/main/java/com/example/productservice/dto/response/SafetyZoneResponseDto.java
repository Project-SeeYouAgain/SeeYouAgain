package com.example.productservice.dto.response;

import com.example.productservice.entity.Cctv;
import com.example.productservice.entity.SafetyZone;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SafetyZoneResponseDto {
    private String address;
    private float lat;
    private float lng;
    public static SafetyZoneResponseDto from(SafetyZone safetyZone) {
        return SafetyZoneResponseDto.builder()
                .address(safetyZone.getAddress())
                .lat(safetyZone.getLat())
                .lng(safetyZone.getLng())
                .build();
    }
}
