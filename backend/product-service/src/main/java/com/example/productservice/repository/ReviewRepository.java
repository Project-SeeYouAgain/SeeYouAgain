package com.example.productservice.repository;

import com.example.productservice.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long>, ReviewRepositoryCustom {
    List<Review> findAllByProductId(Long productId);

    @Query("SELECT r FROM Review r WHERE r.product.id = :ownerId ORDER BY r.createdAt DESC")
    List<Review> findAllByProductIdOrderByCreatedAt(@Param("ownerId") Long ownerId);

    void deleteAllByProductId(Long productId);
}
