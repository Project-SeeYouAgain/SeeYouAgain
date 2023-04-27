package com.example.productservice.entity;

import com.example.productservice.dto.request.ReviewRequestDto;
import com.example.productservice.dto.response.ReviewResponseDto;
import com.example.productservice.dto.response.UserClientResponseDto;
import lombok.*;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
public class Review extends TimeStamped {

    @Id
    @Column(name = "review_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = Product.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    private Long lenderId;

    private String nickname;

    private String content;

    private Integer reviewScore;

    private String reviewImgKey;

    private String reviewImgUrl;

    public static Review of(Product product, Long lenderId, String nickname,
                            ReviewRequestDto requestDto, String reviewImgKey, String reviewImgUrl) {
        return Review.builder()
                .product(product)
                .lenderId(lenderId)
                .nickname(nickname)
                .content(requestDto.getContent())
                .reviewScore(requestDto.getReviewScore())
                .reviewImgKey(reviewImgKey)
                .reviewImgUrl(reviewImgUrl)
                .build();
    }

    public void updateReview(ReviewRequestDto requestDto, String reviewImgKey, String reviewImgUrl) {
        this.reviewScore = requestDto.getReviewScore();
        this.content = requestDto.getContent();
        this.reviewImgKey = reviewImgKey;
        this.reviewImgUrl = reviewImgUrl;
    }

}
