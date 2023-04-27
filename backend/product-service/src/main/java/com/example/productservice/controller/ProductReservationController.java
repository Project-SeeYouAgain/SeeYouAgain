package com.example.productservice.controller;

import com.example.productservice.dto.BaseResponseDto;
import com.example.productservice.dto.request.ReservationRequestDto;
import com.example.productservice.dto.response.ReservationResponseDto;
import com.example.productservice.service.ProductReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class ProductReservationController {

    private final ProductReservationService productReservationService;

    //대여 예약 생성
    @PostMapping("/reservation/{productId}")
    public ResponseEntity<BaseResponseDto<ReservationRequestDto>> createReservation(HttpServletRequest request,
                                                                                    @PathVariable("productId") Long productId,
                                                                                    @RequestBody ReservationRequestDto requestDto) {
        productReservationService.createReservation(Long.parseLong(request.getHeader("userId")), productId, requestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new BaseResponseDto<>(201, "success"));
    }

    //대여 예약 조회(대여중/ 대여완료/ 예약중)
    @GetMapping("/reservation/{state}")
    public ResponseEntity<BaseResponseDto<List<ReservationResponseDto>>> getReservationList(HttpServletRequest request,
                                                                                      @PathVariable("state") String state) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success",
                         productReservationService.getReservationList(getUserId(request), state)));
    }

    // 내 물품 조회(대여중/ 대기중/ 숨김)
    @GetMapping("/myproduct/{state}")
    public ResponseEntity<BaseResponseDto<List<ReservationResponseDto>>> getMyProduct(HttpServletRequest request,
                                                                                      @PathVariable("state") String state) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success",
                        productReservationService.myProductList(getUserId(request), state)));
    }

    // 예약 요청 수정
    @PatchMapping("/reservation/{reservationId}")
    public ResponseEntity<BaseResponseDto<ReservationRequestDto>> updateReservation(HttpServletRequest request,
                                                                                    @PathVariable("reservationId")
                                                                                    Long reservationId) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success"));
    }

    public Long getUserId(HttpServletRequest request) {
        return Long.parseLong(request.getHeader("userId"));
    }
}
