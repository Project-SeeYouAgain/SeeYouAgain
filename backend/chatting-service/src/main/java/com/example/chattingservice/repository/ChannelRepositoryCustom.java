package com.example.chattingservice.repository;

import com.example.chattingservice.entity.Channel;

import java.util.List;

public interface ChannelRepositoryCustom {
    List<Channel> findAllByOwnerIdOrUserId(Long userId, String type);
}
