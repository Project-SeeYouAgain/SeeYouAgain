package com.example.productservice.controller;

import com.example.productservice.dto.BaseResponseDto;
import com.example.productservice.dto.request.ReviewRequestDto;
import com.example.productservice.dto.response.ReviewResponseDto;
import com.example.productservice.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth/review")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/{productId}/{lastReviewId}")
    public ResponseEntity<BaseResponseDto<List<ReviewResponseDto>>> getProductReview(@PathVariable("productId") Long productId,
                                                                                     @PathVariable("lastReviewId") Long lastReviewId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success", reviewService.getProductReview(productId, lastReviewId)));
    }

    @PostMapping("/{productId}")
    public ResponseEntity<BaseResponseDto<?>> createProductReview(HttpServletRequest request,
                                                                  @PathVariable("productId") Long productId,
                                                                  @RequestPart ReviewRequestDto requestDto,
                                                                  @RequestPart(required = false) MultipartFile reviewImg) {
        reviewService.createProductReview(getUserId(request), productId, requestDto, reviewImg);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new BaseResponseDto<>(201, "success"));
    }

    @PatchMapping("/{reviewId}")
    public ResponseEntity<BaseResponseDto<?>> updateProductReview(HttpServletRequest request,
                                                                  @PathVariable("reviewId") Long reviewId,
                                                                  @RequestPart ReviewRequestDto requestDto,
                                                                  @RequestPart(required = false) MultipartFile reviewImg) {
        reviewService.updateProductReview(getUserId(request), reviewId, requestDto, reviewImg);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success"));
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<BaseResponseDto<?>> deleteProductReview(HttpServletRequest request,
                                                                  @PathVariable("reviewId") Long reviewId) {
        reviewService.deleteProductReview(getUserId(request), reviewId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .body(new BaseResponseDto<>(204, "success"));
    }

    private Long getUserId(HttpServletRequest request) {
        return Long.parseLong(request.getHeader("userId"));
    }
}
