package com.example.chattingservice.service;

import com.example.chattingservice.client.ProductServiceClient;
import com.example.chattingservice.client.UserServiceClient;
import com.example.chattingservice.dto.request.ChannelRequestDto;
import com.example.chattingservice.dto.response.ChannelDetailResponseDto;
import com.example.chattingservice.dto.response.ChannelResponseDto;
import com.example.chattingservice.dto.response.ProductClientResponseDto;
import com.example.chattingservice.dto.response.UserClientResponseDto;
import com.example.chattingservice.entity.Channel;
import com.example.chattingservice.entity.Message;
import com.example.chattingservice.entity.Participant;
import com.example.chattingservice.exception.ApiException;
import com.example.chattingservice.exception.ExceptionEnum;
import com.example.chattingservice.repository.ChannelRepository;
import com.example.chattingservice.repository.MessageRepository;
import com.example.chattingservice.repository.ParticipantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ChannelServiceImpl implements ChannelService {

    private final ChannelRepository channelRepository;

    private final ProductServiceClient productServiceClient;

    private final UserServiceClient userServiceClient;

    private final ParticipantRepository participantRepository;

    private final MessageRepository messageRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ChannelResponseDto> getChannelList(Long userId, String type) {
        List<Channel> myChannelList = channelRepository.findAllByOwnerIdOrUserId(userId, type);
        List<ChannelResponseDto> channelResponseDtoList = new ArrayList<>();
        myChannelList.forEach(c -> {
            PageRequest pageRequest = PageRequest.of(0, 1);
            List<Message> latestMessage = messageRepository.findLatestMessage(c.getId(), pageRequest);

            Participant participant = participantRepository.findByUserIdAndChannelIdentifier(userId, c.getIdentifier())
                    .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_CHATTING_MEMBER_EXCEPTION));

            int totalMessageSize = getTotalMessageSize(userId, c);

            if (latestMessage.size() > 0) {
                UserClientResponseDto responseDto = getUserClientResponseDto(type, c);
                channelResponseDtoList.add(ChannelResponseDto.of(c, responseDto, latestMessage.get(0), totalMessageSize - participant.getReadMessageSize()));
            }
        });

        Collections.sort(channelResponseDtoList);

        return channelResponseDtoList;
    }

    private int getTotalMessageSize(Long userId, Channel channel) {
        Long youId;
        if (channel.getOwnerId().equals(userId)) {
            youId = channel.getUserId();
        } else {
            youId = channel.getOwnerId();
        }

        return messageRepository
                .findTotalMessage(youId, channel.getIdentifier()).size();
    }

    private UserClientResponseDto getUserClientResponseDto(String type, Channel c) {

        if (type.equals("borrow")) return userServiceClient.getUserInfo(c.getOwnerId()).getData();

        return userServiceClient.getUserInfo(c.getUserId()).getData();
    }

    @Override
    @Transactional
    public String createChannel(Long userId, ChannelRequestDto requestDto) {
        Optional<Channel> findChannel = channelRepository.findByOwnerIdAndUserId(requestDto.getOwnerId(), userId);

        if (findChannel.isEmpty()) return saveChannelInfo(userId, requestDto);

        return findChannel.get().getIdentifier();
    }

    private String saveChannelInfo(Long userId, ChannelRequestDto requestDto) {
        UserClientResponseDto myUserInfo = userServiceClient.getUserInfo(userId).getData();
        UserClientResponseDto ownerUserInfo = userServiceClient.getUserInfo(requestDto.getOwnerId()).getData();
        ProductClientResponseDto productInfo = productServiceClient.getProductInfo(requestDto.getProductId()).getData();

        Channel channel = getChannel(userId, requestDto, productInfo);
        channelRepository.save(channel);

        Participant me = Participant.of(channel, userId, myUserInfo, false);
        participantRepository.save(me);

        Participant you = Participant.of(channel, requestDto.getOwnerId(), ownerUserInfo, false);
        participantRepository.save(you);

        return channel.getIdentifier();
    }

    private static Channel getChannel(Long userId, ChannelRequestDto requestDto, ProductClientResponseDto productInfo) {
        if (productInfo.getType()) {
            return Channel.of(requestDto.getProductId(), requestDto.getOwnerId(), userId, UUID.randomUUID().toString(), productInfo);
        }
        return Channel.of(requestDto.getProductId(), userId, requestDto.getOwnerId(), UUID.randomUUID().toString(), productInfo);
    }

    @Override
    @Transactional(readOnly = true)
    public ChannelDetailResponseDto getChannelDetail(Long userId, String identifier) {
        Channel channel = channelRepository.findByIdentifier(identifier)
                .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_EXIST_CHANNEL_EXCEPTION));

        ProductClientResponseDto productResponseDto = productServiceClient.getProductInfo(channel.getProductId()).getData();

        UserClientResponseDto userResponseDto = getUserClientResponseDto(userId, channel);

        return ChannelDetailResponseDto.of(channel, productResponseDto, userResponseDto);
    }

    private UserClientResponseDto getUserClientResponseDto(Long userId, Channel channel) {
        if (channel.getUserId().equals(userId)) {
            return userServiceClient.getUserInfo(channel.getOwnerId()).getData();
        }
        return userServiceClient.getUserInfo(channel.getUserId()).getData();
    }
}
