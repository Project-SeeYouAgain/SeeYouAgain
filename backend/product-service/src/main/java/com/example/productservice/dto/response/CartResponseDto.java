package com.example.productservice.dto.response;

import com.example.productservice.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartResponseDto {

private Long productId;

private Boolean type;

private String title;

private Integer price;

private String location;

private double score;

private String productImg;

private Boolean isSafe;

public static CartResponseDto of(Product product, double score, String productImg) {
    return CartResponseDto.builder()
            .productId(product.getId())
            .type(product.getType())
            .title(product.getTitle())
            .price(product.getPrice())
            .location(product.getLocation())
            .score(score)
            .productImg(productImg)
            .isSafe(product.getIsSafe())
            .build();
}
}
