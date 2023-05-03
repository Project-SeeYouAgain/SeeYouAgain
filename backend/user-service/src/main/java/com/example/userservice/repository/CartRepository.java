package com.example.userservice.repository;


import com.example.userservice.entity.Cart;
import com.example.userservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUserAndProductId(User user, Long productId);

}
