package com.example.productservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductListResponseDto {
    private String title;

    private String location;

    private Integer price;

    private Boolean type;

    private Boolean isCart;

    private String thumbnailUrl;
}
