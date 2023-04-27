package com.example.productservice.dto.request;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
public class ReviewRequestDto {

    private String content;

    private Integer reviewScore;

    private MultipartFile reviewImg;
}
