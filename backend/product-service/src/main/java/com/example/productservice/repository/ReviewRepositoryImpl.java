package com.example.productservice.repository;

import com.example.productservice.dto.response.ReviewResponseDto;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.example.productservice.entity.QReview.review;

@RequiredArgsConstructor
public class ReviewRepositoryImpl implements ReviewRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<ReviewResponseDto> getReviewListByProductId(Long productId, Long lastReviewId) {
        return queryFactory
                .select(Projections.constructor(
                    ReviewResponseDto.class,
                    review.nickname,
                    review.content,
                    review.reviewScore,
                    review.createdAt,
                    review.reviewImgUrl
                ))
                .from(review)
                .where(review.product.id.eq(productId).and(ltReviewId(lastReviewId)))
                .limit(5)
                .fetch();
    }

    private BooleanExpression ltReviewId(Long lastReviewId) {
        return lastReviewId != null ? review.id.lt(lastReviewId) : null;
    }
}
