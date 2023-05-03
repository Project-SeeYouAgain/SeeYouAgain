package com.example.productservice.dto.response;

import com.example.productservice.entity.Light;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LightResponseDto {
    private String address;
    private double lat;
    private double lng;

    public static LightResponseDto from(Light light) {
        return LightResponseDto.builder()
                .address(light.getAddress())
                .lat(light.getLat())
                .lng(light.getLng())
                .build();
    }
}
