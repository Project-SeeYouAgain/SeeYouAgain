package com.example.productservice.repository;

import com.example.productservice.entity.ProductImg;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductImgRepository extends JpaRepository<ProductImg, Long> {
}
