package com.example.productservice.entity;

import com.example.productservice.dto.request.ReservationRequestDto;
import com.example.productservice.dto.request.ReservationReturnRequestDto;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
public class Reservation {

    @Id
    @Column(name = "reservation_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = Product.class, fetch = FetchType.LAZY)
    @JoinColumn(name="product_id")
    private Product product;

    @Column(nullable = false)
    private Long lenderId;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private Boolean isCheck;

    @Column(nullable = false)
    private Boolean isReturnCheck;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ReservationEnum state;

    public static Reservation of(Long userId,
                                 Product product,
                                 ReservationRequestDto dto,
                                 ReservationEnum state) {

        return Reservation.builder()
                .product(product)
                .lenderId(userId)
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .location(dto.getLocation())
                .isCheck(false)
                .isReturnCheck(false)
                .state(state)
                .build();
    }

    public void checkReservation() {
        this.isCheck = true;
    }

    public void checkReturnReservation() {
        this.isCheck = true;
    }

    public void updateState(ReservationEnum state) {
        this.state = state;
    }

    public void updateLocation(ReservationReturnRequestDto requestDto) {
        this.endDate = requestDto.getEndDate();
        this.location = requestDto.getLocation();

    }
}
