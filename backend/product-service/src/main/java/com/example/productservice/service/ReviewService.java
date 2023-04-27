package com.example.productservice.service;

import com.example.productservice.dto.request.ReviewRequestDto;
import com.example.productservice.dto.response.ReviewResponseDto;

import java.util.List;

public interface ReviewService {
    List<ReviewResponseDto> getProductReview(Long productId, Long lastReviewId);

    void createProductReview(Long userId, Long productId, ReviewRequestDto requestDto);

    void updateProductReview(Long userId, Long reviewId, ReviewRequestDto requestDto);

    void deleteProductReview(Long userId, Long reviewId);
}
