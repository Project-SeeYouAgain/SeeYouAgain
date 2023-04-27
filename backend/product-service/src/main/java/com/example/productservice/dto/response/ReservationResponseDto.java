package com.example.productservice.dto.response;

import com.example.productservice.entity.Product;
import com.example.productservice.entity.ProductImg;
import com.example.productservice.entity.Reservation;
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

    private double score;

    private String productImg;

    private Boolean isSafe;

    public static ReservationResponseDto of(Reservation reservation,
                                            Product product,
                                            double reviewScore,
                                            ProductImg productImg) {
        return ReservationResponseDto.builder()
                .startDate(reservation.getStartDate())
                .endDate(reservation.getEndDate())
                .productId(reservation.getId())
                .title(product.getTitle())
                .price(product.getPrice())
                .location(product.getLocation())
                .score(reviewScore)
                .productImg(productImg.getProductImg())
                .isSafe(product.getIsSafe())
                .build();
    }
}
