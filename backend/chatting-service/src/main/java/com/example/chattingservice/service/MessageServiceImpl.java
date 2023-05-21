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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService{

    private final MessageRepository messageRepository;

    private final ChannelRepository channelRepository;

    private final ParticipantRepository participantRepository;

    private final AmazonS3Service amazonS3Service;

    @Override
    @Transactional
    public MessageResponseDto insertMessage(MessageRequestDto requestDto) {
        Participant participant = participantRepository.findByUserIdAndChannelIdentifier(requestDto.getWriterId(), requestDto.getIdentifier())
                .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_CHATTING_MEMBER_EXCEPTION));

        Participant you = participantRepository.findByUserIdAndChannelIdentifier(requestDto.getYouId(), requestDto.getIdentifier())
                .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_CHATTING_MEMBER_EXCEPTION));

        if (you.getIsOut()) you.plusReadMessageSize();

        Channel channel = channelRepository.findByIdentifier(requestDto.getIdentifier())
                .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_EXIST_CHANNEL_EXCEPTION));

        boolean isOut = getIsOut(participant, channel);

        Message message = Message.of(requestDto, channel, participant, isOut);
        messageRepository.save(message);
        return MessageResponseDto.from(message);
    }

    private boolean getIsOut(Participant participant, Channel channel) {
        Participant you;
        if (channel.getOwnerId().equals(participant.getUserId())) {
            you = participantRepository.findByUserIdAndChannelIdentifier(channel.getUserId(), channel.getIdentifier())
                    .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_CHATTING_MEMBER_EXCEPTION));
        } else {
            you = participantRepository.findByUserIdAndChannelIdentifier(channel.getOwnerId(), channel.getIdentifier())
                    .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_CHATTING_MEMBER_EXCEPTION));
        }
        return you.getIsOut();
    }

    @Override
    @Transactional(readOnly = true)
    public List<MessageResponseDto> getMessageByChannelId(String identifier, Long firstMessageId) {
        return messageRepository.findLatestMessageList(identifier, firstMessageId);
    }

    @Override
    @Transactional
    public String saveChatImage(MultipartFile chatImage) {
        String chatImageKey = saveS3Img(chatImage);
        return amazonS3Service.getFileUrl(chatImageKey);
    }

    private String saveS3Img(MultipartFile profileImg) {
        try {
            return amazonS3Service.upload(profileImg, "chatting");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
