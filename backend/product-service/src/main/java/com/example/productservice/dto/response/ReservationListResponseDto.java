package com.example.productservice.dto.response;

import com.example.productservice.entity.Product;
import com.example.productservice.entity.Reservation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReservationListResponseDto {

    private String startDate;

    private String endDate;

    public static ReservationListResponseDto from(Reservation reservation) {
        return ReservationListResponseDto.builder()
                .startDate(reservation.getStartDate().toString())
                .endDate(reservation.getEndDate().toString())
                .build();
    }

    public static ReservationListResponseDto from(Product product) {
        return ReservationListResponseDto.builder()
                .startDate(product.getStartDate().toString())
                .endDate(product.getEndDate().toString())
                .build();
    }
}
