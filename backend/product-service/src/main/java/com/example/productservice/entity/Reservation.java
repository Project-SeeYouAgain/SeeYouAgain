package com.example.productservice.entity;

import com.example.productservice.dto.request.ProductReservationRequestDto;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
public class Reservation {

    @Id
    @Column(name = "reservation_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = Product.class, fetch = FetchType.LAZY)
    @JoinColumn(name="product_id")
    private Product product;

    @Column(nullable = false)
    private Long lenderId;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    public static Reservation of(Long userId, Product product, ProductReservationRequestDto dto) {

        return Reservation.builder()
                .product(product)
                .lenderId(userId)
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .build();
    }
}
