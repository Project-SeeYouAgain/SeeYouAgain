package com.example.productservice.repository;

import com.example.productservice.entity.Light;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LightRepository extends JpaRepository<Light, Long> {
    List<Light> findAllByAddressContains(String address);
}
