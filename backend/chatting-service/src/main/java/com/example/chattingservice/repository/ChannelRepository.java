package com.example.chattingservice.repository;

import com.example.chattingservice.entity.Channel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ChannelRepository extends JpaRepository<Channel, Long> {
    Optional<Channel> findByOwnerIdAndUserId(Long ownerId, Long userId);

    @Query("select c from Channel c where c.ownerId = :userId or c.userId = :userId")
    List<Channel> findByOwnerIdOrUserId(@Param("userId") Long userId);

}
