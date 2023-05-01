package com.example.userservice.controller;

import com.example.userservice.dto.BaseResponseDto;
import com.example.userservice.service.AuthService;
import com.example.userservice.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth/cart")
public class CartController {

    private final CartService cartService;

    /**
     * 찜하기 API입니다.
     *
     * @param request
     * @param productId
     * @return
     */
    @PostMapping("/{productId}")
    public ResponseEntity<BaseResponseDto<?>> addCart(HttpServletRequest request,
                                                      @PathVariable("productId") Long productId) {
        Long userId = getUserId(request);
        cartService.addCart(userId, productId);
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseDto<>(201, "success"));
    }

    /**
     * 찜삭제 API입니다.
     *
     * @param request
     * @param productId
     * @return
     */
    @DeleteMapping("/cart/{productId}")
    public ResponseEntity<BaseResponseDto<?>> deleteCart(HttpServletRequest request,
                                                      @PathVariable("productId") Long productId) {
        Long userId = getUserId(request);
        cartService.deleteCart(userId, productId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new BaseResponseDto<>(204, "success"));
    }

    private Long getUserId(HttpServletRequest request) {
        return Long.parseLong(request.getHeader("userId"));
    }

}