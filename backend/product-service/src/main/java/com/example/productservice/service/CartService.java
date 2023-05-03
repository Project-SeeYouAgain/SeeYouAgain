package com.example.productservice.service;

import com.example.productservice.dto.response.CartResponseDto;

import java.util.List;

public interface CartService {
    void addCart(Long userId, Long productId);

    void deleteCart(Long userId, Long productId);

    List<CartResponseDto> getMyCart(Long userId);
}
