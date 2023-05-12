package com.example.productservice.controller;

import com.example.productservice.dto.BaseResponseDto;
import com.example.productservice.dto.request.ProductListRequestDto;
import com.example.productservice.dto.request.ProductRequestDto;
import com.example.productservice.dto.response.ProductListResponseDto;
import com.example.productservice.dto.response.ProductResponseDto;
import com.example.productservice.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

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
                .body(new BaseResponseDto<>(200, "success", productService
                        .getDetailProduct(getUserId(request),productId)));
    }

    // 대여 물품 생성
    @PostMapping
    public ResponseEntity<BaseResponseDto<?>> createProduct(HttpServletRequest request,
                                                            @RequestPart ProductRequestDto requestDto,
                                                            @RequestPart(required = false) List<MultipartFile> productImg) {

        productService.createProduct(getUserId(request), requestDto, productImg);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new BaseResponseDto<>(201, "success"));
    }

    // 대여 물품 수정
    @PatchMapping("/{productId}")
    public ResponseEntity<BaseResponseDto<?>> updateProduct(HttpServletRequest request,
                                                            @PathVariable("productId") Long productId,
                                                            @RequestPart ProductRequestDto requestDto,
                                                            @RequestPart(required = false) List<MultipartFile> productImg) {
        productService.updateProduct(getUserId(request), productId ,requestDto, productImg);
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

    // 대여 물품 목록(sort:최신순(0), 가격순(1), 별점순(2))
    @PostMapping("/productlist")
    public ResponseEntity<BaseResponseDto<List<ProductListResponseDto>>> getProductList(HttpServletRequest request,
                                                                                        @RequestBody ProductListRequestDto requestDto) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success",
                        productService.getProductList(getUserId(request), requestDto)));
    }

    // 해당 키워드 물품 목록 조회
    @PostMapping("/search/{keyword}")
    public ResponseEntity<BaseResponseDto<List<ProductListResponseDto>>> getProductListByKeyword(HttpServletRequest request,
                                                                                                 @RequestBody ProductListRequestDto requestDto,
                                                                                                 @PathVariable("keyword") String keyword) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success",
                        productService.getProductListByKeyword(getUserId(request), requestDto, keyword)));
    }

    // 물품 숨김
    @PatchMapping("/hide/{productId}")
    public ResponseEntity<BaseResponseDto<?>> addHide(HttpServletRequest request,
                                                      @PathVariable("productId") Long productId) {

        productService.updateHide(getUserId(request), productId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(201, "success"));
    }

    public Long getUserId(HttpServletRequest request) {
        return Long.parseLong(request.getHeader("userId"));
    }
}
