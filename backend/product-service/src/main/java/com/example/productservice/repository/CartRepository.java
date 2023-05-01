package com.example.productservice.repository;

import com.example.productservice.entity.Cart;
import com.example.productservice.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    Optional<Cart> findByUserAndProductId(Long userId, Product product);

}
