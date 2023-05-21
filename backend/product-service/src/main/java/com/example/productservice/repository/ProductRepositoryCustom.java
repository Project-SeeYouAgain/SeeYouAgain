package com.example.productservice.repository;

import com.example.productservice.entity.Product;

import java.util.List;

public interface ProductRepositoryCustom {

    List<Product> getProductList(int sort, Long productId, String category, Boolean location, String myLocation, Integer price);

    List<Product> getProductListByKeyword(Long productId, String keyword);
}
