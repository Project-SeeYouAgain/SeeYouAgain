package com.example.productservice.entity;

import com.example.productservice.dto.request.ProductRequestDto;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Product extends TimeStamped {

    @Id
    @Column(name="product_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    /** 상품 id **/
    private Long id;

    @Column(nullable = false)
    private Long ownerId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private Boolean type;

    @Column(nullable = false, length = 50)
    private String category;

    @Column(nullable = false)
    private Integer price;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false, length = 50)
    private String location;

    @Column(nullable = false)
    private Boolean productState;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private Integer hit;

    @Column(nullable = false)
    private Integer refreshCnt;

    @Column(nullable = false)
    private LocalDateTime refreshedAt;

    @Column(nullable = false)
    private Boolean isSafe;

    public static Product of(Long userId,
                             ProductRequestDto dto,
                             Boolean productState,
                             Integer hitCnt,
                             Integer refreshCnt,
                             LocalDateTime refreshTime) {

        return Product.builder()
                .ownerId(userId)
                .title(dto.getTitle())
                .type(dto.getType())
                .category(dto.getCategory())
                .price(dto.getPrice())
                .description(dto.getDescription())
                .location(dto.getLocation())
                .productState(productState)
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .hit(hitCnt)
                .refreshCnt(refreshCnt)
                .refreshedAt(refreshTime)
                .isSafe(dto.getIsSafe())
                .build();
    }
}

