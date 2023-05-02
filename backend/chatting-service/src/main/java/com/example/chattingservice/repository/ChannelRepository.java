package com.example.chattingservice.repository;

import com.example.chattingservice.entity.Channel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChannelRepository extends JpaRepository<Channel, Long>, ChannelRepositoryCustom {
    Optional<Channel> findByOwnerIdAndUserId(Long ownerId, Long userId);

    Optional<Channel> findByIdentifier(String identifier);
}
