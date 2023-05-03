package com.example.productservice.repository;

import com.example.productservice.entity.Cctv;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CctvRepository extends JpaRepository<Cctv, Long> {
    List<Cctv> findAllByAddressContains(String address);
}
