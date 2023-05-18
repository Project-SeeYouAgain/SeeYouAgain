package com.example.productservice.service;

import com.example.productservice.client.UserServiceClient;
import com.example.productservice.dto.request.ReviewRequestDto;
import com.example.productservice.dto.response.ReviewResponseDto;
import com.example.productservice.dto.response.UserClientResponseDto;
import com.example.productservice.entity.Product;
import com.example.productservice.entity.Reservation;
import com.example.productservice.entity.Review;
import com.example.productservice.exception.ApiException;
import com.example.productservice.exception.ExceptionEnum;
import com.example.productservice.repository.ReservationRepository;
import com.example.productservice.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    private final UserServiceClient userServiceClient;

    private final AmazonS3Service amazonS3Service;

    private final ReservationRepository reservationRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ReviewResponseDto> getProductReview(Long productId, Integer page) {
        return reviewRepository.getReviewListByProductId(productId, page);
    }

    @Override
    @Transactional
    public void createReservationReview(Long userId, Long reservationId, ReviewRequestDto requestDto,
                                        MultipartFile reviewImg) {
        UserClientResponseDto responseDto = userServiceClient.getUserInfo(userId).getData();

        if (reviewRepository.findByReservationId(reservationId).isEmpty()) {
            Reservation reservation = reservationRepository.findById(reservationId)
                    .orElseThrow(() -> new ApiException(ExceptionEnum.RESERVATION_NOT_EXIST_EXCEPTION));

            reservation.writeReview();

            Review review = getReview(userId, requestDto, responseDto.getNickname(), reservation.getProduct(), reservation, reviewImg);

            // 리뷰 저장
            reviewRepository.save(review);
        } else {
            throw new ApiException(ExceptionEnum.REVIEW_EXIST_EXCEPTION);
        }
    }

    private Review getReview(Long userId, ReviewRequestDto requestDto, String nickname,
                             Product product, Reservation reservation, MultipartFile reviewImg) {

        if (reviewImg == null) {
            return Review.of(product, reservation, userId, nickname, requestDto, null, null);
        }

        String reviewKey = saveS3Img(reviewImg);
        String reviewUrl = amazonS3Service.getFileUrl(reviewKey);
        return Review.of(product, reservation, userId, nickname, requestDto, reviewKey, reviewUrl);
    }

    private String saveS3Img(MultipartFile reviewImg) {
        try {
            return amazonS3Service.upload(reviewImg, "review");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public void updateProductReview(Long userId, Long reviewId, ReviewRequestDto requestDto, MultipartFile reviewImg) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.REVIEW_NOT_EXIST_EXCEPTION));

        writerValidation(userId, review);

        deleteS3Img(review);

        updateReview(reviewImg, requestDto, review);
    }

    private void updateReview(MultipartFile reviewImg, ReviewRequestDto requestDto, Review review) {
        if (!reviewImg.isEmpty()) {
            String reviewImgKey = saveS3Img(reviewImg);
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

        writerValidation(userId, review);

        deleteS3Img(review);

        reviewRepository.delete(review);
    }

    private void deleteS3Img(Review review) {
        if (review.getReviewImgKey() != null) amazonS3Service.delete(review.getReviewImgKey());
    }

    private static void writerValidation(Long userId, Review review) {
        if (!review.getLenderId().equals(userId)) throw new ApiException(ExceptionEnum.OWNER_NOT_MATCH_EXCEPTION);
    }

}
