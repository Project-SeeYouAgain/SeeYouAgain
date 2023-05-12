package com.example.productservice.repository;

import com.example.productservice.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long>, ProductRepositoryCustom {

    @Query("SELECT p FROM Product p WHERE p.title like %:keyword% order by p.refreshedAt DESC")
    List<Product> findAllByTitleOrderByDate(@Param("keyword") String keyword);

    @Query("SELECT p FROM Product p WHERE p.title like %:keyword% order by p.price")
    List<Product> findAllByTitleOrderByPrice(@Param("keyword") String keyword);

    @Query("SELECT distinct p FROM Review r JOIN r.product p WHERE p.title like %:keyword% GROUP BY p.id ORDER BY Avg(r.reviewScore) DESC")
    List<Product> findAllByTitleOrderByScore(@Param("keyword") String keyword);

}
