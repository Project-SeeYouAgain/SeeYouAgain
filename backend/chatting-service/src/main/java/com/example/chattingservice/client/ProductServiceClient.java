package com.example.chattingservice.client;

import com.example.chattingservice.dto.BaseResponseDto;
import com.example.chattingservice.dto.response.ProductClientResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "product-service")
public interface ProductServiceClient {

    @GetMapping("/product/{productId}")
    BaseResponseDto<ProductClientResponseDto> getProductInfo(@PathVariable Long productId);
}
