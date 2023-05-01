package com.example.userservice.service;

public interface CartService {
    void addCart(Long userId, Long productId);
    void deleteCart(Long userId, Long productId);
}