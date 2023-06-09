package com.example.productservice.service;

import com.example.productservice.dto.request.ReservationRequestDto;
import com.example.productservice.dto.request.ReservationReturnRequestDto;
import com.example.productservice.dto.response.ReservationListResponseDto;
import com.example.productservice.dto.response.ReservationLocationResponseDto;
import com.example.productservice.dto.response.ReservationResponseDto;
import com.example.productservice.entity.*;
import com.example.productservice.exception.ApiException;
import com.example.productservice.exception.ExceptionEnum;
import com.example.productservice.repository.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final ProductRepository productRepository;

    private final ProductImgRepository productImgRepository;

    private final ReservationRepository reservationRepository;

    private final ReviewRepository reviewRepository;

    private final CartRepository cartRepository;
    private Logger log;

    /**
     * explain : 제품 예약 생성
     */
    @Override
    @Transactional
    public void createReservation(Long userId, Long productId, ReservationRequestDto requestDto) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.PRODUCT_NOT_EXIST_EXCEPTION));

        Reservation reservation = Reservation.of(userId, product, requestDto, ReservationEnum.BEFORE_LEND);
        reservationRepository.save(reservation);
    }

    /**
     * explain : 빌려주는 사람이 예약 확정
     */
    @Override
    @Transactional
    public void checkReservation(Long userId, Long reservationId, String state) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.RESERVATION_NOT_EXIST_EXCEPTION));

        // 빌려주는 사람 아이디가 본인과 다르다면 에러
        if (!reservation.getProduct().getOwnerId().equals(userId))
            throw new ApiException(ExceptionEnum.OWNER_NOT_MATCH_EXCEPTION);

        // 대여 관련 체크면 LEND, 반납 관련 체크면 RETURN
        if (state.equals("LEND")) {
            reservation.checkReservation();
        } else if (state.equals("RETURN")) {
            reservation.checkReturnReservation();
        }
    }

    /**
     * explain : 대여 완료
     */
    @Override
    @Transactional
    public void doneReservation(Long userId, Long reservationId, String state) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.RESERVATION_NOT_EXIST_EXCEPTION));

        Product product = productRepository.findById(reservation.getProduct().getId())
                .orElseThrow(() -> new ApiException(ExceptionEnum.PRODUCT_NOT_EXIST_EXCEPTION));

        if (state.equals("LENDING")) {
            // 빌리는 사람 아이디가 본인과 다르다면 에러
            if (!reservation.getLenderId().equals(userId))
                throw new ApiException(ExceptionEnum.LENDER_NOT_MATCH_EXCEPTION);

            // 예약 완료로 변경 + product에서도 예약 완료로 변경
            product.updateProductState(false);
            reservation.updateState(ReservationEnum.LENDING);
        } else if (state.equals("RETURN")) {
            // 빌려주는 사람 아이디가 본인과 다르면 에러
            if (!reservation.getProduct().getOwnerId().equals(userId))
                throw new ApiException(ExceptionEnum.OWNER_NOT_MATCH_EXCEPTION);

            // 반납 완료로 변경 + product에서도 대여 가능으로 변경
            product.updateProductState(true);
            reservation.updateState(ReservationEnum.RETURN);
        }
    }

    /**
     * explain : 예약 수정
     */
    @Override
    @Transactional
    public void updateReservation(Long userId, Long reservationId, ReservationReturnRequestDto requestDto) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.PRODUCT_NOT_EXIST_EXCEPTION));

        // 대여자가 본인이 아닐 경우 에러
        if (!reservation.getLenderId().equals(userId))
            throw new ApiException(ExceptionEnum.LENDER_NOT_MATCH_EXCEPTION);

        // 대여 중이 아닌 경우에는 에러
        if (!reservation.getState().equals(ReservationEnum.LENDING))
            throw new ApiException(ExceptionEnum.MEMBER_ACCESS_EXCEPTION);

        reservation.updateLocation(requestDto);
    }

    /**
     * explain : 예약 삭제
     */
    @Override
    @Transactional
    public void deleteReservation(Long userId, Integer state, Long productId) {
        Reservation reservation = null;
        if (state.equals(0)) {
            reservation = reservationRepository.findReservationOwnerId(productId, userId).get(0);
            if (!reservation.getProduct().getOwnerId().equals(userId))
                throw new ApiException(ExceptionEnum.LENDER_NOT_MATCH_EXCEPTION);
        } else {
            reservation = reservationRepository.findReservationLenderId(productId, userId).get(0);
            // 본인이 대여자가 아니거나, 본인이 주인이 아니라면 에러
            if (!reservation.getLenderId().equals(userId))
                throw new ApiException(ExceptionEnum.LENDER_NOT_MATCH_EXCEPTION);
        }
        reservationRepository.delete(reservation);
    }

    // 물품 전체 예약 리스트
    @Override
    @Transactional(readOnly = true)
    public List<ReservationListResponseDto> getReservation(Long productId) {
        List<ReservationListResponseDto> returnList = new ArrayList<>();

        Product findProduct = productRepository.findById(productId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.PRODUCT_NOT_EXIST_EXCEPTION));

        returnList.add(ReservationListResponseDto.from(findProduct));

        List<Reservation> reservationList = reservationRepository.findAllByProductId(productId);
        List<ReservationListResponseDto> reservationListResponseDtoList =
                reservationList.stream().map((r)-> ReservationListResponseDto.from(r)).collect(toList());

        for (ReservationListResponseDto reservationListResponseDto : reservationListResponseDtoList) {
            returnList.add(reservationListResponseDto);
        }

        return returnList;
    }

    // 예약 조회
    @Override
    public ReservationLocationResponseDto getLocation(Long myId, Long productId, Long userId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.PRODUCT_NOT_EXIST_EXCEPTION));
        Reservation reservation = null;
        if (product.getOwnerId().equals(myId)) {
            reservation = reservationRepository.findAllByProductIdAndLenderId(productId, userId, myId).get(0);
        } else {
            reservation = reservationRepository.findAllByProductIdAndLenderId(productId, myId, userId).get(0);
        }
        return ReservationLocationResponseDto.from(reservation);
    }

    /**
     * explain : 대여 받은 내역 조회
     */
    @Override
    @Transactional(readOnly = true)
    public List<ReservationResponseDto> getReservationList(Long userId, Integer state) {

        if (state.equals(1)) {
           List<Reservation> reservationList = reservationRepository.findAllByLenderIdNow(userId);
            return getReservationResponse(reservationList, userId);

        } else if (state.equals(3)) {
           List<Reservation> reservationList = reservationRepository.findAllByLenderIdEnd(userId);
           return getReservationResponse(reservationList, userId);

        } else if (state.equals(2)) {
            List<Reservation> reservationList = reservationRepository.findAllByLenderIdWaiting(userId);
            return getReservationResponse(reservationList, userId);

        }
        return null;
    }
    /**
     * explain : 내 품목 조회
     */
    @Override
    @Transactional(readOnly = true)
    public List<ReservationResponseDto> myProductList(Long userId, Integer state) {

        if (state.equals(1)) {
            List<ReservationResponseDto> responseList = new ArrayList<>();
            List<Product> productList = productRepository.findByOwnerId(userId);

            productList.forEach((p) -> {
                double ReviewScoreAverage = getReviewScoreAvg(reviewRepository.findAllByProductId(p.getId()));
                ProductImg productImg = productImgRepository.findAllByProductId(p.getId()).get(0);
                Optional<Cart> cart = cartRepository.findByUserIdAndProductId(userId, p.getId());

                Boolean isCart = cart.isPresent();

                List<Reservation> reservationList = reservationRepository.findAllByProductId(p.getId());
                if (reservationList.isEmpty()) {
                    responseList.add(ReservationResponseDto.of(p, ReviewScoreAverage, productImg, isCart));
                } else {
                    for (Reservation reservation : reservationList) {
                        responseList.add(ReservationResponseDto.of(reservation, p, ReviewScoreAverage, productImg, isCart));
                    }
                }
            });
            return responseList;

        } else if (state.equals(2)) {
            List<Reservation> reservationList = reservationRepository.findAllByOwnerIdNow(userId);
            return getReservationResponse(reservationList, userId);

        } else if (state.equals(3)) {
            List<Product> productList = productRepository.findAllByOwnerIdIsHidden(userId);
            return productList.stream().map((p) -> {
                double ReviewScoreAverage = getReviewScoreAvg(reviewRepository.findAllByProductId(p.getId()));
                ProductImg productImg = productImgRepository.findAllByProductId(p.getId()).get(0);
                Optional<Cart> cart = cartRepository.findByUserIdAndProductId(userId, p.getId());
                Boolean isCart = cart.isPresent();
                return ReservationResponseDto.of(p, ReviewScoreAverage, productImg, isCart);
            }).collect(toList());

        }
        return null;
    }

    private double getReviewScoreAvg(List<Review> reviewList) {
        int cnt = reviewList.size();
        int totalScore = 0;
        for (Review review : reviewList) {
            totalScore += review.getReviewScore();
        }
        return (double) totalScore / cnt;
    }

    private List<ReservationResponseDto> getReservationResponse(List<Reservation> reservationList, Long userId) {
        return reservationList.stream().map(r -> {
            Product product = r.getProduct();
            double ReviewScoreAverage = getReviewScoreAvg(reviewRepository.findAllByProductId(product.getId()));
            ProductImg productImg = productImgRepository.findAllByProductId(product.getId()).get(0);

            Optional<Cart> cart = cartRepository.findByUserIdAndProductId(userId, product.getId());

            Boolean isCart = cart.isPresent();
            return ReservationResponseDto.of(r, product, ReviewScoreAverage, productImg, isCart);
        }).collect(toList());
    }
}
