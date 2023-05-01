package com.example.userservice.dto.response.user;

import com.example.userservice.entity.Location;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LocationResponseDto {

    private Long userId;
    private double lat;
    private double lng;

    public static LocationResponseDto from(Location location) {
        return LocationResponseDto.builder()
                .userId(location.getUser().getId())
                .lat(location.getLat())
                .lng(location.getLng())
                .build();
    }
}
