package com.example.productservice.service;

import com.example.productservice.dto.request.ReservationRequestDto;
import com.example.productservice.dto.response.ReservationResponseDto;

import java.util.List;

public interface ProductReservationService {

    void createReservation(Long userId, Long productId, ReservationRequestDto requestDto);

    List<ReservationResponseDto> getReservationList(Long userId, String state);

    List<ReservationResponseDto> myProductList(Long userId, String state);
}
