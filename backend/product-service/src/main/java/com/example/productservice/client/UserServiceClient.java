package com.example.productservice.client;

import com.example.productservice.dto.BaseResponseDto;
import com.example.productservice.dto.response.UserClientResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user-service")
public interface UserServiceClient {

    @GetMapping("/user/{userId}")
    BaseResponseDto<UserClientResponseDto> getUserInfo(@PathVariable Long userId);
}
