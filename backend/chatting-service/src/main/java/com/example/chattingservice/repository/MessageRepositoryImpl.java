package com.example.chattingservice.repository;

import com.example.chattingservice.dto.response.MessageResponseDto;
import com.example.chattingservice.entity.QChannel;
import com.example.chattingservice.entity.QMessage;
import com.example.chattingservice.entity.QParticipant;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.example.chattingservice.entity.QChannel.channel;
import static com.example.chattingservice.entity.QMessage.message;
import static com.example.chattingservice.entity.QParticipant.participant;

@RequiredArgsConstructor
public class MessageRepositoryImpl implements MessageRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<MessageResponseDto> findLatestMessageList(Long channelId, Long firstMessageId) {
        return queryFactory.select(Projections.constructor(
                MessageResponseDto.class,
                message.channel.id.as("channelId"),
                message.participant.id.as("writerId"),
                message.participant.nickname,
                message.chat,
                message.createdAt,
                message.updatedAt
        ))
                .from(message)
                .join(message.channel, channel)
                .join(message.participant, participant)
                .where(channel.id.eq(channelId).and(ltMessageId(firstMessageId)))
                .orderBy(message.id.desc())
                .limit(20)
                .fetch();
    }

    private BooleanExpression ltMessageId(Long firstMessageId) {
        return firstMessageId != null ? message.id.lt(firstMessageId) : null;
    }
}
