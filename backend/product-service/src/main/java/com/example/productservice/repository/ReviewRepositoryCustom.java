package com.example.productservice.repository;

import com.example.productservice.dto.response.ReviewResponseDto;

import java.util.List;

public interface ReviewRepositoryCustom {

    List<ReviewResponseDto> getReviewListByProductId(Long productId, Long lastReviewId);
}
