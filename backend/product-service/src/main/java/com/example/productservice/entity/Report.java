package com.example.productservice.entity;

import com.example.productservice.dto.request.ReportRequestDto;
import lombok.*;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
public class Report {

    @Id
    @Column(name="product_tag_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = Product.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    private Long reporterId;

    private String content;

    private String category;

    public static Report of(Long userId,
                            Product product,
                            ReportRequestDto requestDto) {
        return Report.builder()
                .product(product)
                .reporterId(userId)
                .content(requestDto.getContent())
                .category(requestDto.getCategory())
                .build();
    }
}
