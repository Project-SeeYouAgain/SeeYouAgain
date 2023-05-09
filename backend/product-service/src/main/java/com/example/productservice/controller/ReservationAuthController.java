package com.example.productservice.controller;

import com.example.productservice.dto.BaseResponseDto;
import com.example.productservice.dto.request.ReservationRequestDto;
import com.example.productservice.dto.request.ReservationReturnRequestDto;
import com.example.productservice.dto.response.ReservationListResponseDto;
import com.example.productservice.dto.response.ReservationResponseDto;
import com.example.productservice.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class ReservationAuthController {

    private final ReservationService reservationService;

    //대여 예약 생성
    @PostMapping("/reservation/request/{productId}")
    public ResponseEntity<BaseResponseDto<?>> createReservation(HttpServletRequest request,
                                                                @PathVariable("productId") Long productId,
                                                                @RequestBody ReservationRequestDto requestDto) {
        reservationService.createReservation(getUserId(request), productId, requestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new BaseResponseDto<>(201, "success"));
    }

    // 예약 확정
    @PatchMapping("/reservation/check/{reservationId}/{state}")
    public ResponseEntity<BaseResponseDto<?>> checkReservation(HttpServletRequest request,
                                                               @PathVariable("reservationId") Long reservationId,
                                                               @PathVariable("state") String state) {
        reservationService.checkReservation(getUserId(request), reservationId, state);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success"));
    }

    // 대여 상태 변경
    @PatchMapping("/reservation/done/{reservationId}/{state}")
    public ResponseEntity<BaseResponseDto<?>> doneReservation(HttpServletRequest request,
                                                              @PathVariable("reservationId") Long reservationId,
                                                              @PathVariable("state") String state
                                                              ) {

        reservationService.doneReservation(getUserId(request), reservationId, state);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success"));
    }

    // 대여 날짜 변경
    @PatchMapping("/reservation/return/{reservationId}")
    public ResponseEntity<BaseResponseDto<?>> updateReservation(HttpServletRequest request,
                                                                @PathVariable("reservationId") Long reservationId,
                                                                @RequestBody ReservationReturnRequestDto requestDto) {
        reservationService.updateReservation(getUserId(request), reservationId, requestDto);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success"));
    }

    // 예약 삭제
    @DeleteMapping("/reservation/{reservationId}")
    public ResponseEntity<BaseResponseDto<?>> deleteReservation(HttpServletRequest request,
                                                                @PathVariable("reservationId") Long reservationId) {
        reservationService.deleteReservation(getUserId(request), reservationId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success"));
    }

    //대여 예약 조회(대여중 : 1/ 대여완료 : 3/ 예약중 : 2)
    @GetMapping("/reservation/{state}")
    public ResponseEntity<BaseResponseDto<List<ReservationResponseDto>>> getReservationList(HttpServletRequest request,
                                                                                            @PathVariable("state") Integer state) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success",
                         reservationService.getReservationList(getUserId(request), state)));
    }

    // 내 물품 조회(대여중 : 1/ 대기중 : 2/ 숨김 : 3)
    @GetMapping("/myproduct/{state}")
    public ResponseEntity<BaseResponseDto<List<ReservationResponseDto>>> getMyProduct(HttpServletRequest request,
                                                                                      @PathVariable("state") Integer state) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success",
                        reservationService.myProductList(getUserId(request), state)));
    }

    @GetMapping("/reservation/list/{productId}")
    public ResponseEntity<BaseResponseDto<List<ReservationListResponseDto>>> getReservation(@PathVariable("productId")
                                                                                           Long productId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success",
                        reservationService.getReservation(productId)));
    }

    public Long getUserId(HttpServletRequest request) {
        return Long.parseLong(request.getHeader("userId"));
    }
}
