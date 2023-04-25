package com.example.chattingservice.repository;

import com.example.chattingservice.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.awt.print.Pageable;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("select m from Message m where m.channel.id = :channelId order by m.createdAt desc")
    List<Message> findLatestMessage(@Param("channelId") Long channelId);
}
