package com.example.chattingservice.service;

import com.example.chattingservice.dto.request.ChannelRequestDto;
import com.example.chattingservice.dto.response.ChannelResponseDto;

import java.util.List;

public interface ChannelService {

    List<ChannelResponseDto> getChannelList(Long userId);

    void createChannel(Long userId, ChannelRequestDto requestDto);
}
