package com.example.productservice.entity;

import com.example.productservice.dto.request.ProductRequestDto;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

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

    // 대여 가능 : true, 대여중 : false
    @Column(nullable = false)
    private Boolean productState;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private Integer refreshCnt;

    @Column(nullable = false)
    private LocalDateTime refreshedAt;

    @Column(nullable = false)
    private Boolean isSafe;

    @Column(nullable = false)
    private Boolean isHide;

    public static Product of(Long userId,
                             ProductRequestDto dto,
                             Boolean productState,
                             Integer refreshCnt,
                             LocalDateTime refreshTime,
                             Boolean isHide) {
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
                .refreshCnt(refreshCnt)
                .refreshedAt(refreshTime)
                .isSafe(dto.getIsSafe())
                .isHide(isHide)
                .build();
    }

    public void updateProduct(ProductRequestDto requestDto) {
        this.title = requestDto.getTitle();
        this.type = requestDto.getType();
        this.category = requestDto.getCategory();
        this.price = requestDto.getPrice();
        this.description = requestDto.getDescription();
        this.location = requestDto.getLocation();
        this.startDate = requestDto.getStartDate();
        this.endDate = requestDto.getEndDate();
        this.isSafe = requestDto.getIsSafe();
        this.isHide = requestDto.getIsHide();
    }

    public void updateProductState(Boolean state) {
        this.productState = state;
    }
}

