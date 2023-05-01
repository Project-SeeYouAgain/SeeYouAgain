package com.example.productservice.service;

import com.example.productservice.entity.Cart;
import com.example.productservice.entity.Product;
import com.example.productservice.exception.ApiException;
import com.example.productservice.exception.ExceptionEnum;
import com.example.productservice.repository.CartRepository;
import com.example.productservice.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final ProductRepository productRepository;
    private final CartRepository cartRepository;

    @Override
    @Transactional
    public void addCart(Long userId, Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.PRODUCT_NOT_EXIST_EXCEPTION));

        Cart cart = Cart.of(product, userId);

        cartRepository.save(cart);
    }

    @Override
    @Transactional
    public void deleteCart(Long userId, Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.PRODUCT_NOT_EXIST_EXCEPTION));

        Cart cart = cartRepository.findByUserAndProductId(userId, product)
                .orElseThrow(() -> new ApiException(ExceptionEnum.CART_NOT_EXIST_EXCEPTION));

        cartRepository.delete(cart);
    }
}
