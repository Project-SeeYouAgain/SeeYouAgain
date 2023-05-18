package com.example.userservice.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Table(name = "location")
public class Location extends TimeStamped {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private Double lat;
    private Double lng;
    private Boolean moving;

    public static Location of(User user, Double lat, Double lng, Boolean moving) {
        return Location.builder()
                .user(user)
                .lat(lat)
                .lng(lng)
                .moving(moving)
                .build();
    }

    public void updateLatLngMoving(Double lat, Double lng, Boolean moving) {
        this.lat = lat;
        this.lng = lng;
        this.moving = moving;
    }
}
