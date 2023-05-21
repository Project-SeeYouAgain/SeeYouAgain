package com.example.chattingservice.repository;

import com.example.chattingservice.entity.Channel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChannelRepository extends JpaRepository<Channel, Long>, ChannelRepositoryCustom {
    Optional<Channel> findByOwnerIdAndUserIdAndProductId(Long ownerId, Long userId, Long productId);

    Optional<Channel> findByIdentifier(String identifier);
}
