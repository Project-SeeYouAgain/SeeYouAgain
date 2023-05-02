package com.example.productservice.controller;

import com.example.productservice.dto.BaseResponseDto;
import com.example.productservice.dto.response.CartResponseDto;
import com.example.productservice.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth/cart")
public class CartController {

    private final CartService cartService;


    @GetMapping
    public ResponseEntity<BaseResponseDto<List<CartResponseDto>>> getMyCart(HttpServletRequest request) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success", cartService.getMyCart(getUserId(request))));
    }

    @PostMapping("/{productId}")
    public ResponseEntity<BaseResponseDto<?>> addCart(HttpServletRequest request,
                                                      @PathVariable("productId") Long productId) {
        cartService.addCart(getUserId(request), productId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(201, "success"));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<BaseResponseDto<?>> deleteCart(HttpServletRequest request,
                                                         @PathVariable("productId") Long productId) {
        Long userId = getUserId(request);
        cartService.deleteCart(userId, productId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new BaseResponseDto<>(204, "success"));
    }

    public Long getUserId(HttpServletRequest request) {
        return Long.parseLong(request.getHeader("userId"));
    }

}
