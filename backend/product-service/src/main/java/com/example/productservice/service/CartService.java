package com.example.productservice.service;

public interface CartService {
    void addCart(Long userId, Long productId);

    void deleteCart(Long userId, Long productId);
}
