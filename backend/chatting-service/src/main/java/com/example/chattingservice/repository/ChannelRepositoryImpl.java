package com.example.chattingservice.repository;

import com.example.chattingservice.entity.Channel;
import com.example.chattingservice.entity.QChannel;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.example.chattingservice.entity.QChannel.channel;

@RequiredArgsConstructor
public class ChannelRepositoryImpl implements ChannelRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Channel> findAllByOwnerIdOrUserId(Long userId, String type) {
        return queryFactory
                .selectFrom(channel)
                .where(typeEq(type, userId))
                .fetch();
    }

    private BooleanExpression typeEq(String type, Long userId) {
        return type.equals("borrow") ? channel.userId.eq(userId) : channel.ownerId.eq(userId);
    }
}
