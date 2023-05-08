package com.example.productservice.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@Builder
@AttributeOverride(name = "id", column = @Column(name = "cctv_id"))
public class Cctv extends SafetyZone {

}
