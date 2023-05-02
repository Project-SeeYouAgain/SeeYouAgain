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
            UserClientResponseDto responseDto = getUserClientResponseDto(type, c);

            PageRequest pageRequest = PageRequest.of(0, 1);
            List<Message> latestMessage = messageRepository.findLatestMessage(c.getId(), pageRequest);

            if (latestMessage.size() > 0) {
                channelResponseDtoList.add(ChannelResponseDto.of(c, responseDto, latestMessage.get(0)));
            }
        });

        channelResponseDtoList.sort(new Comparator<ChannelResponseDto>() {
            @Override
            public int compare(ChannelResponseDto o1, ChannelResponseDto o2) {
                return o2.getLastMessageDate().compareTo(o1.getLastMessageDate());
            }
        });

        return channelResponseDtoList;
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

        Channel channel;
        if (productInfo.getType()) {
            channel = Channel.of(requestDto.getProductId(), requestDto.getOwnerId(), userId, UUID.randomUUID().toString(), productInfo);
        } else {
            channel = Channel.of(requestDto.getProductId(), userId, requestDto.getOwnerId(), UUID.randomUUID().toString(), productInfo);
        }
        channelRepository.save(channel);

        Participant me = Participant.of(channel, userId, myUserInfo, true);
        participantRepository.save(me);

        Participant you = Participant.of(channel, requestDto.getOwnerId(), ownerUserInfo, false);
        participantRepository.save(you);
    }
}
