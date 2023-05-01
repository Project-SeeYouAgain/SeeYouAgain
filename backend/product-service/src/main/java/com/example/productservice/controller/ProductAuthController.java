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

    // 전체 대여 물품 조회(sorted)


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
                                                                            @RequestPart ProductRequestDto requestDto) {

        productService.createProduct(getUserId(request), requestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new BaseResponseDto<>(201, "success"));
    }

    // 대여 물품 수정
    @PatchMapping("/{productId}")
    public ResponseEntity<BaseResponseDto<ProductRequestDto>> updateProduct(HttpServletRequest request,
                                                                            @PathVariable("productId") Long productId,
                                                                            @RequestPart ProductRequestDto requestDto) {
        productService.updateProduct(getUserId(request), productId ,requestDto);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success"));
    }

    // 대여 물품 삭제
    @DeleteMapping("/{productId}")
    public ResponseEntity<BaseResponseDto<?>> deleteProduct(HttpServletRequest request,
                                                         @PathVariable("productId") Long productId) {
        productService.deleteProduct(getUserId(request), productId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success"));
    }

    public Long getUserId(HttpServletRequest request) {
        return Long.parseLong(request.getHeader("userId"));
    }
}
