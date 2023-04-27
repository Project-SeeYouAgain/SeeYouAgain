package com.example.productservice.service;

import com.example.productservice.client.UserServiceClient;
import com.example.productservice.dto.request.ReservationRequestDto;
import com.example.productservice.dto.response.ReservationResponseDto;
import com.example.productservice.entity.Product;
import com.example.productservice.entity.ProductImg;
import com.example.productservice.entity.Reservation;
import com.example.productservice.entity.Review;
import com.example.productservice.exception.ApiException;
import com.example.productservice.exception.ExceptionEnum;
import com.example.productservice.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class ProductReservationServiceImpl implements ProductReservationService {

    private final ProductRepository productRepository;

    private final ProductImgRepository productImgRepository;

    private final ProductTagRepository productTagRepository;

    private final ReservationRepository reservationRepository;

    private final ReviewRepository reviewRepository;

    private final UserServiceClient userServiceClient;

    /**
     * explain : 제품 예약 생성
     */
    @Override
    @Transactional
    public void createReservation(Long userId, Long productId, ReservationRequestDto requestDto) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.PRODUCT_NOT_EXIST_EXCEPTION));

        Reservation reservation = Reservation.of(userId, product, requestDto);
        reservationRepository.save(reservation);
    }

    /**
     * explain : 대여 받은 내역 조회
     */
    @Override
    @Transactional(readOnly = true)
    public List<ReservationResponseDto> getReservationList(Long userId, String state) {

        if (state == "대여중") {
           List<Reservation> reservationList = reservationRepository.findAllByLenderIdNow(userId);
            return getReservationResponse(reservationList);

        } else if (state == "대여 완료") {
           List<Reservation> reservationList = reservationRepository.findAllByLenderIdEnd(userId);
           return getReservationResponse(reservationList);

        } else if (state == "예약중") {
            List<Reservation> reservationList = reservationRepository.findAllByOwnerIdWaiting(userId);
            return getReservationResponse(reservationList);

        } else {
            return null;
        }

    }
    /**
     * explain : 내 품목 조회
     */
    @Override
    @Transactional(readOnly = true)
    public List<ReservationResponseDto> myProductList(Long userId, String state) {

        if (state == "대여중") {
            List<Reservation> reservationList = reservationRepository.findAllByOwnerIdNow(userId);
            return getReservationResponse(reservationList);

        } else if (state == "대기중") {
            List<Reservation> reservationList = reservationRepository.findAllByOwnerIdWaiting(userId);
            return getReservationResponse(reservationList);

        } else if (state == "숨김") {
            List<Reservation> reservationList = reservationRepository.findAllByOwnerIdIsHidden(userId);
            return getReservationResponse(reservationList);

        } else {
            return null;
        }
    }

    private double getReviewScoreAvg(List<Review> reviewList) {
        int cnt = reviewList.size();
        int totalScore = 0;
        for (Review review : reviewList) {
            totalScore += review.getReviewScore();
        }
        return (double) totalScore / cnt;
    }

    private List<ReservationResponseDto> getReservationResponse(List<Reservation> reservationList) {
        return reservationList.stream().map(r -> {
            Product product = r.getProduct();
            double ReviewScoreAverage = getReviewScoreAvg(reviewRepository.findAllByProductId(product.getId()));
            ProductImg productImg = productImgRepository.findAllByProductId(product.getId()).get(0);
            return ReservationResponseDto.of(r, product, ReviewScoreAverage, productImg);
        }).collect(toList());
    }  
}
