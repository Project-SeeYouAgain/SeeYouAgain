package com.example.productservice.dto.response;

import com.example.productservice.entity.Police;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PoliceResponseDto {
    private String name;
    private String station;
    private String address;

    public static PoliceResponseDto from(Police police) {
        return PoliceResponseDto.builder()
                .name(police.getName())
                .station(police.getStation())
                .address(police.getAddress())
                .build();
    }
}
