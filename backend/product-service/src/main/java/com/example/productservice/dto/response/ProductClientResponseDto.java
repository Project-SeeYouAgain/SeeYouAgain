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
    private String title;
    private Integer price;
    private String location;
    private String productImg;
    private Boolean productState;
    private Boolean type;

    public static ProductClientResponseDto of(Product product, String productImg) {
        return ProductClientResponseDto.builder()
                .ownerId(product.getOwnerId())
                .title(product.getTitle())
                .price(product.getPrice())
                .location(product.getLocation())
                .productImg(productImg)
                .productState(product.getProductState())
                .type(product.getType())
                .build();
    }
}

