package com.example.productservice.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@Builder
@AttributeOverride(name = "id", column = @Column(name = "light_id"))
public class Light extends SafetyZone {

}
