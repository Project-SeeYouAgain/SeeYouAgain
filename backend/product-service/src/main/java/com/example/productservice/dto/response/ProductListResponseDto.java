package com.example.productservice.dto.response;

import com.example.productservice.entity.Product;
import com.example.productservice.entity.ProductImg;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductListResponseDto {

    private Long productId;

    private String title;

    private String location;

    private Integer price;

    private Boolean  type;

    private Boolean isCart;

    private String thumbnailUrl;

    private double score;

    private Boolean state;

    public static ProductListResponseDto of(Product product,
                                            double score,
                                            String productImg,
                                            boolean isCart) {
        return ProductListResponseDto.builder()
                .productId(product.getId())
                .title(product.getTitle())
                .location(product.getLocation())
                .price(product.getPrice())
                .type(product.getType())
                .isCart(isCart)
                .thumbnailUrl(productImg)
                .score(score)
                .state(product.getProductState())
                .build();
    }
}
