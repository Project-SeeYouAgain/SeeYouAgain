package com.example.productservice.entity;

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

    private String content;

    private Integer reviewScore;
}
