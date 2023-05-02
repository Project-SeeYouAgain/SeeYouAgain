package com.example.productservice.service;

import com.example.productservice.dto.request.ReservationRequestDto;
import com.example.productservice.dto.request.ReservationReturnRequestDto;
import com.example.productservice.dto.response.ReservationResponseDto;

import java.util.List;

public interface ReservationService {

    void createReservation(Long userId, Long productId, ReservationRequestDto requestDto);

    void checkReservation(Long userId, Long reservationId, String state);

    void doneReservation(Long userId, Long reservationId, String state);

    List<ReservationResponseDto> getReservationList(Long userId, Integer state);

    List<ReservationResponseDto> myProductList(Long userId, Integer state);

    void updateReservation(Long userId, Long reservationId, ReservationReturnRequestDto requestDto);

    void deleteReservation(Long userId, Long reservationId);
}
