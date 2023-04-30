package com.example.productservice.service;

import com.example.productservice.client.UserServiceClient;
import com.example.productservice.dto.request.ReviewRequestDto;
import com.example.productservice.dto.response.ReviewResponseDto;
import com.example.productservice.dto.response.UserClientResponseDto;
import com.example.productservice.entity.Product;
import com.example.productservice.entity.Review;
import com.example.productservice.exception.ApiException;
import com.example.productservice.exception.ExceptionEnum;
import com.example.productservice.repository.ProductRepository;
import com.example.productservice.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService{

    private final ReviewRepository reviewRepository;

    private final ProductRepository productRepository;

    private final UserServiceClient userServiceClient;

    private final AmazonS3Service amazonS3Service;
    
    @Override
    @Transactional(readOnly = true)
    public List<ReviewResponseDto> getProductReview(Long productId, Long lastReviewId) {
        return reviewRepository.getReviewListByProductId(productId, lastReviewId);
    }

    @Override
    @Transactional
    public void createProductReview(Long userId, Long productId, ReviewRequestDto requestDto) {
        UserClientResponseDto responseDto = userServiceClient.getUserInfo(userId).getData();

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.PRODUCT_NOT_EXIST_EXCEPTION));

        Review review = getReview(userId, requestDto, responseDto.getNickname(), product);

        // 리뷰 저장
        reviewRepository.save(review);
    }

    private Review getReview(Long userId, ReviewRequestDto requestDto, String nickname, Product product) {

        if (requestDto.getReviewImg().isEmpty()) {
            return Review.of(product, userId, nickname, requestDto, null, null);
        }

        String reviewKey = saveS3Img(requestDto);
        String reviewUrl = amazonS3Service.getFileUrl(reviewKey);
        return Review.of(product, userId, nickname, requestDto, reviewKey, reviewUrl);
    }

    private String saveS3Img(ReviewRequestDto requestDto) {
        try {
            return amazonS3Service.upload(requestDto.getReviewImg(), "review");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public void updateProductReview(Long userId, Long reviewId, ReviewRequestDto requestDto) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.REVIEW_NOT_EXIST_EXCEPTION));

        writerValidation(reviewId, review);

        deleteS3Img(review);

        updateReview(requestDto, review);
    }

    private void updateReview(ReviewRequestDto requestDto, Review review) {
        if (!requestDto.getReviewImg().isEmpty()) {
            String reviewImgKey = saveS3Img(requestDto);
            String reviewImgUrl = amazonS3Service.getFileUrl(reviewImgKey);
            review.updateReview(requestDto, reviewImgKey, reviewImgUrl);
        } else {
            review.updateReview(requestDto, null, null);
        }
    }

    @Override
    @Transactional
    public void deleteProductReview(Long userId, Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.REVIEW_NOT_EXIST_EXCEPTION));

        writerValidation(reviewId, review);

        deleteS3Img(review);

        reviewRepository.deleteById(review.getId());
    }

    private void deleteS3Img(Review review) {
        if (review.getReviewImgKey() != null) amazonS3Service.delete(review.getReviewImgKey());
    }

    private static void writerValidation(Long reviewId, Review review) {
        if (!review.getLenderId().equals(reviewId)) throw new ApiException(ExceptionEnum.OWNER_NOT_MATCH_EXCEPTION);
    }

}
