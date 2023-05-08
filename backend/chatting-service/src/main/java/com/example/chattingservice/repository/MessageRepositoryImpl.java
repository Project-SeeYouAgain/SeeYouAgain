package com.example.chattingservice.repository;

import com.example.chattingservice.dto.response.MessageResponseDto;
import com.example.chattingservice.entity.Message;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.example.chattingservice.entity.QChannel.channel;
import static com.example.chattingservice.entity.QMessage.message;

@RequiredArgsConstructor
public class MessageRepositoryImpl implements MessageRepositoryCustom {

    private final JPAQueryFactory queryFactory;


    @Override
    public List<Message> findNotReadMessageList(String identifier, Long userId, Long lastMessageId) {
        return queryFactory
                .selectFrom(message)
                .where(message.channel.identifier.eq(identifier)
                        .and(message.participant.userId.eq(userId))
                        .and(message.id.gt(lastMessageId))
                        .and(message.isRead.eq(false)))
                .fetch();
    }

    @Override
    public List<MessageResponseDto> findLatestMessageList(String identifier, Long firstMessageId) {
        return queryFactory.select(Projections.constructor(
                MessageResponseDto.class,
                message.id.as("messageId"),
                message.participant.userId.as("writerId"),
                message.participant.profileImg,
                message.chat,
                message.isRead,
                message.createdAt,
                message.updatedAt
        ))
                .from(message)
                .join(message.channel, channel)
                .where(channel.identifier.eq(identifier).and(ltMessageId(firstMessageId)))
                .orderBy(message.id.desc())
                .limit(30)
                .fetch();
    }

    private BooleanExpression ltMessageId(Long firstMessageId) {
        return firstMessageId != null ? message.id.lt(firstMessageId) : null;
    }
}
