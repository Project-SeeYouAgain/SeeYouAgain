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

    public static Location of(User user, Float lat, Float lng) {
        return Location.builder()
                .user(user)
                .lat(lat)
                .lng(lng)
                .build();
    }

    public void updateLatLng(Float lat, Float lng) {
        this.lat = lat;
        this.lng = lng;
    }
}
