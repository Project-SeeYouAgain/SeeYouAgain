package com.example.productservice.service;

import com.example.productservice.dto.request.ReviewRequestDto;
import com.example.productservice.dto.response.ReviewResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ReviewService {
    List<ReviewResponseDto> getProductReview(Long productId, Long lastReviewId);

    void createProductReview(Long userId, Long productId, ReviewRequestDto requestDto, MultipartFile reviewImg);

    void updateProductReview(Long userId, Long reviewId, ReviewRequestDto requestDto, MultipartFile reviewImg);

    void deleteProductReview(Long userId, Long reviewId);
}
