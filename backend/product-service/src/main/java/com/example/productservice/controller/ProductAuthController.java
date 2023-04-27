package com.example.productservice.controller;

import com.example.productservice.dto.BaseResponseDto;
import com.example.productservice.dto.request.ProductRequestDto;
import com.example.productservice.dto.response.ProductResponseDto;
import com.example.productservice.service.ProductService;
import com.fasterxml.jackson.databind.ser.Serializers;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class ProductAuthController {

    private final ProductService productService;

    // 대여 물품 조회
    @GetMapping("/{productId}")
    public ResponseEntity<BaseResponseDto<ProductResponseDto>> getDetailProduct(HttpServletRequest request,
                                                                                @PathVariable("productId") Long productId) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success", productService.getDetailProduct(productId)));
    }

    // 대여 물품 생성
    @PostMapping
    public ResponseEntity<BaseResponseDto<ProductRequestDto>> createProduct(HttpServletRequest request,
                                                                            @RequestBody ProductRequestDto requestDto) {

        productService.createProduct(Long.parseLong(request.getHeader("userId")), requestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new BaseResponseDto<>(201, "success"));
    }

    // 대여 물품 수정
    @PatchMapping("/{productId}")
    public ResponseEntity<BaseResponseDto<ProductRequestDto>> updateProduct(HttpServletRequest request,
                                                                            @PathVariable("productId") Long productId,
                                                                            @RequestBody ProductRequestDto requestDto) {
        productService.updateProduct(Long.parseLong(request.getHeader("userId")), productId ,requestDto);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success"));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<BaseResponseDto<?>> deleteProduct(HttpServletRequest request,
                                                         @PathVariable("productId") Long productId) {
        productService.deleteProduct(productId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success"));
    }
}
