package com.example.userservice.repository;

import com.example.userservice.entity.MannerComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MannerCommentRepository extends JpaRepository<MannerComment, Long> {
}
