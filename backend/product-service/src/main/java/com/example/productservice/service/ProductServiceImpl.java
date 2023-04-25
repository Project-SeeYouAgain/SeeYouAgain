package com.example.productservice.service;

import com.example.productservice.client.UserServiceClient;
import com.example.productservice.dto.request.ProductRequestDto;
import com.example.productservice.dto.response.ProductListResponseDto;
import com.example.productservice.dto.response.ProductResponseDto;
import com.example.productservice.dto.response.UserClientResponseDto;
import com.example.productservice.entity.*;
import com.example.productservice.exception.ApiException;
import com.example.productservice.exception.ExceptionEnum;
import com.example.productservice.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    private final ProductImgRepository productImgRepository;

    private final ProductTagRepository productTagRepository;

    private final ReservationRepository reservationRepository;

    private final ReviewRepository reviewRepository;

    private final UserServiceClient userServiceClient;

    @Override
    @Transactional(readOnly = true)
    public ProductResponseDto getDetailProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.PRODUCT_NOT_EXIST_EXCEPTION));

        List<ProductImg> productImgList = productImgRepository.findAllByProductId(productId);

        List<ProductTag> productTagList = productTagRepository.findAllByProductId(productId);

        List<Reservation> reservationList = reservationRepository.findAllByProductId(productId);

        List<HashMap<String, LocalDate>> reservationMapList = getReservationPeriod(reservationList);

        List<Review> reviewList = reviewRepository.findAllByProductId(productId);

        double totalScore = getReviewScoreAvg(reviewList);

        UserClientResponseDto userInfo = userServiceClient.getUserInfo(product.getOwnerId()).getData();

        return ProductResponseDto.of(product, productImgList, productTagList, reservationMapList, totalScore, userInfo);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductRequestDto createProduct(Long userId, ProductRequestDto requestDto) {
        Boolean productState = true;
        int hitCnt = 0;
        int refreshCnt = 0;
        LocalDateTime refreshTime = LocalDateTime.now();
        Product product = Product.of(userId ,requestDto, productState, hitCnt, refreshCnt, refreshTime);
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

    private List<HashMap<String, LocalDate>> getReservationPeriod(List<Reservation> reservationList) {
        List<HashMap<String, LocalDate>> reservationMapList = new ArrayList<>();
        reservationList.forEach(r -> {
            HashMap<String, LocalDate> reservationMap = new HashMap<>();
            reservationMap.put("startDate", r.getStartDate());
            reservationMap.put("endDate", r.getEndDate());
            reservationMapList.add(reservationMap);
        });

        return reservationMapList;
    }
}
