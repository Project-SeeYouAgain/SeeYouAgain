package com.example.chattingservice.repository;

import com.example.chattingservice.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {
    Optional<Participant> findByUserIdAndChannelIdentifier(Long userId, String identifier);

    @Modifying
    @Query("update Participant p set p.profileImg = :profileImg where p.userId = :userId")
    void updateProfileImg(@Param("userId") Long userId, @Param("profileImg") String profileImg);
}
