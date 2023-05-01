package com.example.userservice.service;

import com.example.userservice.entity.Cart;
import com.example.userservice.entity.User;
import com.example.userservice.exception.ApiException;
import com.example.userservice.exception.ExceptionEnum;
import com.example.userservice.repository.CartRepository;
import com.example.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final UserRepository userRepository;
    private final CartRepository cartRepository;

    @Override
    @Transactional
    public void addCart(Long userId, Long productId) {
        User user = getUser(userId);

        Cart cart = Cart.of(user, productId);

        cartRepository.save(cart);
    }

    @Override
    @Transactional
    public void deleteCart(Long userId, Long productId) {
        User user = getUser(userId);

        Cart cart = cartRepository.findByUserAndProductId(user, productId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.CART_NOT_EXIST_EXCEPTION));

        cartRepository.delete(cart);
    }
    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.MEMBER_NOT_EXIST_EXCEPTION));
    }

}