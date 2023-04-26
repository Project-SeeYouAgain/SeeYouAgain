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
public class ProductClientResponseDto {
    private Long ownerId;
    private String location;
    private String productImg;

    public static ProductClientResponseDto of(Product product, String productImg) {
        return ProductClientResponseDto.builder()
                .ownerId(product.getOwnerId())
                .location(product.getLocation())
                .productImg(productImg)
                .build();
    }
}

