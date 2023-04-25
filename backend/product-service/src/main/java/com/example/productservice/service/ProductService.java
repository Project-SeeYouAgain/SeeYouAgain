package com.example.productservice.service;

import com.example.productservice.dto.request.ProductRequestDto;
import com.example.productservice.dto.response.ProductListResponseDto;
import com.example.productservice.dto.response.ProductResponseDto;

public interface ProductService {
    ProductResponseDto getDetailProduct(Long productId);

    ProductRequestDto createProduct(Long userId, ProductRequestDto requestDto);
}
