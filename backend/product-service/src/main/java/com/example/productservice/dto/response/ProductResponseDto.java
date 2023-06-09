package com.example.productservice.dto.response;

import com.example.productservice.entity.Product;
import com.example.productservice.entity.ProductImg;
import com.example.productservice.entity.ProductTag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponseDto {

    private String title;

    private Integer price;

    private Double lng;

    private Double lat;

    private String location;

    private String category;

    private Long ownerId;

    private String nickname;

    private Integer mannerScore;

    private List<String> productImgList;

    private String description;

    private List<String> tag;

    private String startDate;

    private String endDate;

    private List<HashMap<String, String>> reservation;

    private Boolean isSafe;

    private Double score;

    private Integer hit;

    private Boolean isCart;

    private Integer reviewListSize;

    public static ProductResponseDto of(Product product,
                                        List<ProductImg> productImgList,
                                        List<ProductTag> productTagList,
                                        List<HashMap<String, String>> reservationList,
                                        double totalScore,
                                        UserClientResponseDto responseDto,
                                        Boolean isCart,
                                        Integer reviewListSize) {

        return ProductResponseDto.builder()
                .title(product.getTitle())
                .price(product.getPrice())
                .lng(product.getLng())
                .lat(product.getLat())
                .location(product.getLocation())
                .category(product.getCategory())
                .ownerId(product.getOwnerId())
                .nickname(responseDto.getNickname())
                .mannerScore(responseDto.getMannerScore())
                .productImgList(productImgList.stream().map(ProductImg::getProductImg).collect(toList()))
                .description(product.getDescription())
                .tag(productTagList.stream().map(ProductTag::getTag).collect(toList()))
                .startDate(product.getStartDate().toString())
                .endDate(product.getEndDate().toString())
                .reservation(reservationList)
                .isSafe(product.getIsSafe())
                .score(totalScore)
                .isCart(isCart)
                .reviewListSize(reviewListSize)
                .build();
    }
}
