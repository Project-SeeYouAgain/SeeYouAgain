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
    private String startDate;

    private String endDate;

    private Long productId;

    private String title;

    private Integer price;

    private Float lng;

    private Float lat;

    private String location;

    private double score;

    private String productImg;

    private Boolean isSafe;

    private Boolean isCart;

    private Boolean isHide;

    private Long ownerId;

    private Long reservationId;

    private Boolean hasReview;

    public static ReservationResponseDto of(Reservation reservation,
                                            Product product,
                                            double reviewScore,
                                            ProductImg productImg,
                                            Boolean isCart) {
        return ReservationResponseDto.builder()
                .startDate(reservation.getStartDate().toString())
                .endDate(reservation.getEndDate().toString())
                .productId(product.getId())
                .title(product.getTitle())
                .price(product.getPrice())
                .lng(reservation.getLng())
                .lat(reservation.getLat())
                .location(product.getLocation())
                .score(reviewScore)
                .productImg(productImg.getProductImg())
                .isSafe(product.getIsSafe())
                .isCart(isCart)
                .isHide(product.getIsHide())
                .ownerId(product.getOwnerId())
                .reservationId(reservation.getId())
                .hasReview(reservation.getHasReview())
                .build();
    }
    public static ReservationResponseDto of(Product product,
                                            double reviewScore,
                                            ProductImg productImg,
                                            Boolean isCart) {
        return ReservationResponseDto.builder()
                .startDate(null)
                .endDate(null)
                .productId(product.getId())
                .title(product.getTitle())
                .price(product.getPrice())
                .lng(null)
                .lat(null)
                .location(product.getLocation())
                .score(reviewScore)
                .productImg(productImg.getProductImg())
                .isSafe(product.getIsSafe())
                .isCart(isCart)
                .isHide(product.getIsHide())
                .ownerId(product.getOwnerId())
                .reservationId(null)
                .build();
    }
}
