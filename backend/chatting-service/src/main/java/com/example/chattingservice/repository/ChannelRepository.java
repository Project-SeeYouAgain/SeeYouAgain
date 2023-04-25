package com.example.chattingservice.repository;

import com.example.chattingservice.entity.Channel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChannelRepository extends JpaRepository<Channel, Long> {
}
