package com.example.productservice.service;

import com.example.productservice.dto.request.ReservationRequestDto;
import com.example.productservice.dto.response.ReservationResponseDto;

public interface ProductReservationService {

    void createReservation(Long userId, Long productId, ReservationRequestDto requestDto);

    ReservationResponseDto getReservationList(Long userId);
}
