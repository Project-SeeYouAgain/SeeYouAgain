package com.example.chattingservice.service;

import com.example.chattingservice.dto.request.ProfileImgRequestDto;

public interface ParticipantService {
    void enterChatRoom(Long userId, String identifier);

    void outChatRoom(Long userId, String identifier, Long lastReadMessageId);
}
