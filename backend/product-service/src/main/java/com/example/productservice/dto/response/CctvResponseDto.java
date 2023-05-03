package com.example.productservice.dto.response;

import com.example.productservice.entity.Cctv;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CctvResponseDto {
    private String address;
    private double lat;
    private double lng;

    public static CctvResponseDto from(Cctv cctv) {
        return CctvResponseDto.builder()
                .address(cctv.getAddress())
                .lat(cctv.getLat())
                .lng(cctv.getLng())
                .build();
    }
}
