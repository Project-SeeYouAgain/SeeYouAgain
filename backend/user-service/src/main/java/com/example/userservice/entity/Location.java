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

    private Float lat;
    private Float lng;
    private Boolean moving;

    public static Location of(User user, Float lat, Float lng, Boolean moving) {
        return Location.builder()
                .user(user)
                .lat(lat)
                .lng(lng)
                .moving(moving)
                .build();
    }

    public void updateLatLngMoving(Float lat, Float lng, Boolean moving) {
        this.lat = lat;
        this.lng = lng;
        this.moving = moving;
    }
}
