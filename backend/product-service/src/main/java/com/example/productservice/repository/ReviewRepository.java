package com.example.productservice.repository;

import com.example.productservice.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long>, ReviewRepositoryCustom {
    List<Review> findAllByProductId(Long productId);

    void deleteAllByProductId(Long productId);

    Optional<Review> findByReservationId(Long reservationId);
}
