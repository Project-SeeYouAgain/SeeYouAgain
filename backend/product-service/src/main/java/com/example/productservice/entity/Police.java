package com.example.productservice.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Police {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cctv_id")
    private Long id;
    private String name;
    private String station;
    private String address;
}
