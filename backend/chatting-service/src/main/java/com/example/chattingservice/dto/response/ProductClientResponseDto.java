package com.example.chattingservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductClientResponseDto {
    private Long ownerId;
    private String location;
    private String productImg;
    private Boolean type;

}
