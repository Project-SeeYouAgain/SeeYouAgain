package com.example.chattingservice.service;

import com.example.chattingservice.dto.request.MessageRequestDto;
import com.example.chattingservice.dto.response.MessageResponseDto;
import com.example.chattingservice.entity.Channel;
import com.example.chattingservice.entity.Message;
import com.example.chattingservice.entity.Participant;
import com.example.chattingservice.exception.ApiException;
import com.example.chattingservice.exception.ExceptionEnum;
import com.example.chattingservice.repository.ChannelRepository;
import com.example.chattingservice.repository.MessageRepository;
import com.example.chattingservice.repository.ParticipantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService{

    private final MessageRepository messageRepository;

    private final ChannelRepository channelRepository;

    private final ParticipantRepository participantRepository;

    @Override
    @Transactional
    public void insertMessage(MessageRequestDto requestDto) {
        Participant participant = participantRepository.findByUserIdAndChannelId(requestDto.getUserId(), requestDto.getChannelId())
                .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_CHATTING_MEMBER_EXCEPTION));

        Channel channel = channelRepository.findById(requestDto.getChannelId())
                .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_EXIST_CHANNEL_EXCEPTION));

        Message message = Message.of(requestDto, channel, participant);
        messageRepository.save(message);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MessageResponseDto> getMessageByChannelId(String identifier, Long firstMessageId) {
        return messageRepository.findLatestMessageList(identifier, firstMessageId);
    }
}
