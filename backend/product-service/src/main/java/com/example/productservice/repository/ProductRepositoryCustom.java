package com.example.productservice.repository;

import com.example.productservice.entity.Product;

import java.util.List;

public interface ProductRepositoryCustom {

    List<Product> getProductList(int sort, Long productId, String category, boolean location, String myLocation);
}
