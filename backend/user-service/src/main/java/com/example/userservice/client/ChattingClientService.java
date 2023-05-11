package com.example.userservice.client;

import com.example.userservice.dto.BaseResponseDto;
import com.example.userservice.dto.request.chatting.ProfileImgRequestDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "chatting-service")
public interface ChattingClientService {

    @PutMapping("/auth/participant/{userId}")
    BaseResponseDto<?> updateProfileImg(@PathVariable("userId") Long userId,
                                        @RequestBody ProfileImgRequestDto requestDto);
}
