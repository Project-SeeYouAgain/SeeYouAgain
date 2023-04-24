package com.example.productservice.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
public class ProductImg {

    @Id
    @Column(name = "product_img_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = Product.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    @Column(nullable = false)
    private Product product;

    @Column(nullable = false)
    private String productKey;

    @Column(nullable = false)
    private String productImg;

    @Column(nullable = false)
    private LocalTime createAt;

    @Column(nullable = false)
    private LocalTime modifiedAt;
}
