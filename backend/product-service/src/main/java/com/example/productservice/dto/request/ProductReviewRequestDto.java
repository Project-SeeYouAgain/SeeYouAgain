package com.example.productservice.dto.request;


import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProductReviewRequestDto {

    private String content;

    private Integer reviewScore;
}
