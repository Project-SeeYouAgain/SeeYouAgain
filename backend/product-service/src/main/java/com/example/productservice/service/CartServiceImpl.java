package com.example.productservice.service;

import com.example.productservice.dto.response.CartResponseDto;
import com.example.productservice.dto.response.ReservationResponseDto;
import com.example.productservice.entity.*;
import com.example.productservice.exception.ApiException;
import com.example.productservice.exception.ExceptionEnum;
import com.example.productservice.repository.CartRepository;
import com.example.productservice.repository.ProductImgRepository;
import com.example.productservice.repository.ProductRepository;
import com.example.productservice.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final ProductRepository productRepository;
    private final CartRepository cartRepository;
    private final ReviewRepository reviewRepository;
    private final ProductImgRepository productImgRepository;

    @Override
    @Transactional
    public void addCart(Long userId, Long productId) {

        cartRepository.findByUserIdAndProductId(userId, productId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.CART_EXIST_EXCEPTION));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.PRODUCT_NOT_EXIST_EXCEPTION));

        Cart cart = Cart.of(product, userId);

        cartRepository.save(cart);
    }

    @Override
    @Transactional
    public void deleteCart(Long userId, Long productId) {

        Cart cart = cartRepository.findByUserIdAndProductId(userId, productId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.CART_NOT_EXIST_EXCEPTION));

        cartRepository.delete(cart);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CartResponseDto> getMyCart(Long userId) {

        List<Cart> cartList = cartRepository.findAllByUserId(userId);

        return getCartResponse(cartList);
    }

    private List<CartResponseDto> getCartResponse(List<Cart> cartList) {
        return cartList.stream().map(c -> {
            Product product = c.getProduct();
            double ReviewScoreAverage = getReviewScoreAvg(reviewRepository.findAllByProductId(product.getId()));
            ProductImg productImg = productImgRepository.findAllByProductId(product.getId()).get(0);
            return CartResponseDto.of(product, ReviewScoreAverage, productImg.getProductImg());
        }).collect(toList());
    }

    private double getReviewScoreAvg(List<Review> reviewList) {

        int totalScore = 0;
        for (Review review : reviewList) {
            totalScore += review.getReviewScore();
        }
        return (double) totalScore / reviewList.size();
    }

}
