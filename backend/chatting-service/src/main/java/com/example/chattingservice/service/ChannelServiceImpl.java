package com.example.chattingservice.service;

import com.example.chattingservice.dto.request.ChannelRequestDto;
import com.example.chattingservice.dto.response.ChannelResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChannelServiceImpl implements ChannelService {

    @Override
    public List<ChannelResponseDto> getChannelList(Long userId) {
        return null;
    }

    @Override
    public void createChannel(ChannelRequestDto requestDto) {

    }
}
