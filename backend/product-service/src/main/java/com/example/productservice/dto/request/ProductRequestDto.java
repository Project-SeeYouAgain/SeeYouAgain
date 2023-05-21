package com.example.productservice.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Getter
@NoArgsConstructor
public class ProductRequestDto {

    private String title;

    private Boolean type;

    private String category;

    private Integer price;

    private String description;

    private Double lng;

    private Double lat;

    private String regionCode;

    private List<String> tag;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate startDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate endDate;

    private Boolean isSafe;

    private Boolean isHide;

}
