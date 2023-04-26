package com.example.productservice.controller;

import com.example.productservice.dto.BaseResponseDto;
import com.example.productservice.dto.request.ProductRequestDto;
import com.example.productservice.dto.response.ProductResponseDto;
import com.example.productservice.service.ProductService;
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

    @GetMapping("/{productId}")
    public ResponseEntity<BaseResponseDto<ProductResponseDto>> getDetailProduct(HttpServletRequest request,
                                                                                @PathVariable("productId") Long productId) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success", productService.getDetailProduct(productId)));
    }

    @PostMapping
    public ResponseEntity<BaseResponseDto<ProductRequestDto>> createProduct(HttpServletRequest request,
                                                                            @RequestBody ProductRequestDto requestDto) {

        productService.createProduct(Long.parseLong(request.getHeader("userId")), requestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new BaseResponseDto<>(201, "success"));
    }
}
