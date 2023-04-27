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

    //대여 예약 조회(대여 받은 내역)
    @GetMapping("/reservation/{state}")
    public ResponseEntity<BaseResponseDto<ReservationResponseDto>> getReservationList(HttpServletRequest request,
                                                                                      @PathVariable("state") String state) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success"));
    }
}
