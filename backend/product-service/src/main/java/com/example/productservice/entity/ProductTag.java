package com.example.productservice.entity;

import com.example.productservice.dto.request.ProductRequestDto;
import lombok.*;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
public class ProductTag {

    @Id
    @Column(name="product_tag_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = Product.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(nullable = false, length = 20)
    private String tag;

    public static ProductTag of(Product product, String tag) {

        return ProductTag.builder()
                .product(product)
                .tag(tag)
                .build();
    }
}
