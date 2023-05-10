package com.example.chattingservice.service;

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
public class ParticipantServiceImpl implements ParticipantService {

    private final ParticipantRepository participantRepository;

    private final MessageRepository messageRepository;

    @Override
    @Transactional
    public void enterChatRoom(Long userId, String identifier) {
        Participant participant = participantRepository.findByUserIdAndChannelIdentifier(userId, identifier)
                .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_CHATTING_MEMBER_EXCEPTION));

        Long youId = findYouId(userId, participant);

        int totalMessageSize = messageRepository
                .findTotalMessage(youId, identifier).size();

        participant.updateIsOut(true);
        participant.updateReadMessageSize(totalMessageSize);

        List<Message> notReadMessageList = messageRepository
                .findNotReadMessageList(identifier, youId, participant.getLastReadMessageId());
        notReadMessageList.forEach(Message::updateIsRead);
    }

    private Long findYouId(Long userId, Participant participant) {
        Channel channel = participant.getChannel();
        if (channel.getOwnerId().equals(userId)) {
            return channel.getUserId();
        }
        return channel.getOwnerId();
    }

    @Override
    @Transactional
    public void outChatRoom(Long userId, String identifier, Long lastReadMessageId) {
        Participant participant = participantRepository.findByUserIdAndChannelIdentifier(userId, identifier)
                .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_CHATTING_MEMBER_EXCEPTION));

        participant.updateIsOut(false);
        participant.updateLastReadMessageId(lastReadMessageId);
    }
}
