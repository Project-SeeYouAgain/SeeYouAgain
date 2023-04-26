package com.example.productservice.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
public class ProductImg extends TimeStamped{

    @Id
    @Column(name = "product_img_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = Product.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(nullable = false)
    private String productKey;

    @Column(nullable = false)
    private String productImg;

    public static ProductImg of(Product product, String productKey, String productImg) {
        return ProductImg.builder()
                .product(product)
                .productKey(productKey)
                .productImg(productImg)
                .build();
    }
}
