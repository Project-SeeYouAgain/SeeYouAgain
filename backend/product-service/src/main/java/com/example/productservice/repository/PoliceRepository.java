package com.example.productservice.repository;

import com.example.productservice.entity.Police;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PoliceRepository extends JpaRepository<Police, Long> {
    List<Police> findAllByAddressContains(String address);
}
