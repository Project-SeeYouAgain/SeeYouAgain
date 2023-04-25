package com.example.productservice.repository;

import com.example.productservice.entity.ProductTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductTagRepository extends JpaRepository<ProductTag, Long> {

    List<ProductTag> findAllByProductId(Long productId);
}
