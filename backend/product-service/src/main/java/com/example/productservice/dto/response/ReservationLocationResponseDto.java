package com.example.productservice.dto.response;

import com.example.productservice.entity.Reservation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationLocationResponseDto {

    private Double lng;

    private Double lat;

    private String location;

    private Long reservationId;

    public static ReservationLocationResponseDto from(Reservation reservation) {
        return ReservationLocationResponseDto.builder()
                .lng(reservation.getLng())
                .lat(reservation.getLat())
                .location(reservation.getLocation())
                .reservationId(reservation.getId())
                .build();
    }
}
