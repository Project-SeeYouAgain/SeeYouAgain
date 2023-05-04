package com.example.productservice.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@Builder
@AttributeOverride(name = "id", column = @Column(name = "police_id"))
public class Police extends SafetyZone {

}
