package com.example.userservice.entity;

import com.example.userservice.dto.request.user.MannerCommentRequestDto;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "MannerComment")
public class MannerComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "manner_comment_id")
    private Long id;

    @Column(name = "rater_id", nullable = false)
    private Long raterId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "manner_comment")
    private String mannerComment;

    @Column(name = "manner_score")
    private int mannerScore;

    public static MannerComment of(Long raterId, MannerCommentRequestDto requestDto, User user) {
        return MannerComment.builder()
                .raterId(raterId)
                .user(user)
                .mannerComment(requestDto.getMannerComment())
                .mannerScore(requestDto.getMannerScore())
                .build();
    }
}
