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
        Participant participant = participantRepository.findByUserIdAndChannelIdentifier(requestDto.getWriterId(), requestDto.getIdentifier())
                .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_CHATTING_MEMBER_EXCEPTION));

        Channel channel = channelRepository.findByIdentifier(requestDto.getIdentifier())
                .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_EXIST_CHANNEL_EXCEPTION));

        boolean isOut = getIsOut(participant, channel);

        Message message = Message.of(requestDto, channel, participant, isOut);
        messageRepository.save(message);
    }

    private boolean getIsOut(Participant participant, Channel channel) {
        Participant you;
        if (channel.getOwnerId().equals(participant.getUserId())) {
            you = participantRepository.findByUserId(channel.getUserId())
                    .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_CHATTING_MEMBER_EXCEPTION));
        } else {
            you = participantRepository.findByUserId(channel.getOwnerId())
                    .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_CHATTING_MEMBER_EXCEPTION));
        }
        return you.getIsOut();
    }

    @Override
    @Transactional(readOnly = true)
    public List<MessageResponseDto> getMessageByChannelId(String identifier, Long firstMessageId) {
        return messageRepository.findLatestMessageList(identifier, firstMessageId);
    }
}
