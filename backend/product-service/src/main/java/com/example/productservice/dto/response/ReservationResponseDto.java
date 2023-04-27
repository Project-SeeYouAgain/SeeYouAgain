package com.example.productservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationResponseDto {
    private LocalDate startDate;

    private LocalDate endDate;

    private Long productId;

    private String title;

    private Integer price;

    private String location;

    private Integer score;

    private String productImg;

    private Boolean isSafe;
}
