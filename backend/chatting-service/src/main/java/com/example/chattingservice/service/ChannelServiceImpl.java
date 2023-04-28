package com.example.chattingservice.service;

import com.example.chattingservice.client.ProductServiceClient;
import com.example.chattingservice.client.UserServiceClient;
import com.example.chattingservice.dto.request.ChannelRequestDto;
import com.example.chattingservice.dto.response.ChannelResponseDto;
import com.example.chattingservice.dto.response.ProductClientResponseDto;
import com.example.chattingservice.dto.response.UserClientResponseDto;
import com.example.chattingservice.entity.Channel;
import com.example.chattingservice.entity.Message;
import com.example.chattingservice.entity.Participant;
import com.example.chattingservice.repository.ChannelRepository;
import com.example.chattingservice.repository.MessageRepository;
import com.example.chattingservice.repository.ParticipantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static java.util.stream.Collectors.toList;

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
        return myChannelList.stream()
                .map(c -> {
                    UserClientResponseDto responseDto = getUserClientResponseDto(type, c);

                    PageRequest pageRequest = PageRequest.of(0, 1);
                    List<Message> latestMessage = messageRepository.findLatestMessage(c.getId(), pageRequest);

                    return ChannelResponseDto.of(c, responseDto, latestMessage.get(0));
                })
                .collect(toList());
    }

    private UserClientResponseDto getUserClientResponseDto(String type, Channel c) {

        if (type.equals("borrow")) return userServiceClient.getUserInfo(c.getOwnerId()).getData();

        return userServiceClient.getUserInfo(c.getUserId()).getData();
    }

    @Override
    @Transactional
    public void createChannel(Long userId, ChannelRequestDto requestDto) {
        Optional<Channel> findChannel = channelRepository.findByOwnerIdAndUserId(requestDto.getOwnerId(), userId);

        if (findChannel.isPresent()) return;

        saveChannelInfo(userId, requestDto);
    }

    private void saveChannelInfo(Long userId, ChannelRequestDto requestDto) {
        UserClientResponseDto myUserInfo = userServiceClient.getUserInfo(userId).getData();
        UserClientResponseDto ownerUserInfo = userServiceClient.getUserInfo(requestDto.getOwnerId()).getData();
        ProductClientResponseDto productInfo = productServiceClient.getProductInfo(requestDto.getProductId()).getData();

        Channel channel = Channel.of(requestDto, userId, UUID.randomUUID().toString(), productInfo);
        channelRepository.save(channel);

        Participant me = Participant.of(channel, userId, myUserInfo, true);
        participantRepository.save(me);

        Participant you = Participant.of(channel, requestDto.getOwnerId(), ownerUserInfo, false);
        participantRepository.save(you);
    }
}
