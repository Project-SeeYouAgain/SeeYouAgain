package com.example.productservice.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProductListRequestDto {
    private String location;

    private String category;

    // 최신순 : 0  가격순 : 1 별점순 : 2
    private Integer sort;

    private Long productId;
}
