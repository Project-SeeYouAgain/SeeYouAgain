package com.example.productservice.service;

import com.example.productservice.dto.request.ProductRequestDto;
import com.example.productservice.dto.response.ProductClientResponseDto;
import com.example.productservice.dto.response.ProductResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {
    ProductResponseDto getDetailProduct(Long productId);

    void createProduct(Long userId, ProductRequestDto requestDto, List<MultipartFile> productImg);

    ProductClientResponseDto getProductInfo(Long productId);

    void updateProduct(Long userId, Long productId, ProductRequestDto requestDto, List<MultipartFile> productImg);

    void deleteProduct(Long userId, Long productId);
}
