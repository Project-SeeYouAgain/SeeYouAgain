package com.example.productservice.service;

import com.example.productservice.dto.request.ProductReservationRequestDto;
import com.example.productservice.dto.response.ReservationResponseDto;

public interface ProductReservationService {

    void createReservation(Long userId, Long productId, ProductReservationRequestDto requestDto);

    ReservationResponseDto getReservationList(Long userId);
}
