package com.example.userservice.repository;

import com.example.userservice.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, Long> {
    Optional<Location> findByUserId(Long userId);
}
