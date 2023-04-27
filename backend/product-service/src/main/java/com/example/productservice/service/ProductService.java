package com.example.productservice.service;

import com.example.productservice.dto.request.ProductRequestDto;
import com.example.productservice.dto.response.ProductClientResponseDto;
import com.example.productservice.dto.response.ProductResponseDto;

public interface ProductService {
    ProductResponseDto getDetailProduct(Long productId);

    void createProduct(Long userId, ProductRequestDto requestDto);

    ProductClientResponseDto getProductInfo(Long productId);

    void updateProduct(Long userId, Long productId, ProductRequestDto requestDto);

    void deleteProduct(Long productId);
}
