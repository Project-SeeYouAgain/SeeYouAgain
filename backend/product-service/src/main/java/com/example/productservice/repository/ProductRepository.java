package com.example.productservice.repository;

import com.example.productservice.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // 최신순
    @Query("SELECT p FROM Product p order by p.refreshedAt DESC")
    List<Product> findAllOrderByDate();

    @Query("SELECT p from Product p order by p.price")
    List<Product> findAllOrderByPrice();

    @Query("SELECT distinct p FROM Review r JOIN r.product p GROUP BY p.id ORDER BY Avg(r.reviewScore) DESC")
    List<Product> findAllOrderByScore();
}
