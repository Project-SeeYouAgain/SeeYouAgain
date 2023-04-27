package com.example.productservice.repository;

import com.example.productservice.entity.ProductImg;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductImgRepository extends JpaRepository<ProductImg, Long> {
    List<ProductImg> findAllByProductId(Long productId);

    void deleteAllByProductId(Long productId);
}
