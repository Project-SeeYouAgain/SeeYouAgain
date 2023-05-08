package com.example.chattingservice.repository;

import com.example.chattingservice.entity.Message;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long>, MessageRepositoryCustom {

    @Query("select m from Message m where m.channel.id = :channelId order by m.createdAt desc")
    List<Message> findLatestMessage(@Param("channelId") Long channelId, Pageable pageable);

    int countMessageByParticipantUserIdAndChannelIdentifier(Long userId, String identifier);
}
