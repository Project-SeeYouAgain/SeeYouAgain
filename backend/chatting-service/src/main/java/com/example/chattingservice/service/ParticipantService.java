package com.example.chattingservice.service;

public interface ParticipantService {
    void enterChatRoom(Long userId, String identifier);

    void outChatRoom(Long userId, String identifier);
}
