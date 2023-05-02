package com.example.userservice.controller;

import com.example.userservice.dto.BaseResponseDto;
import com.example.userservice.dto.request.user.LocationRequestDto;
import com.example.userservice.dto.response.user.LocationResponseDto;
import com.example.userservice.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth/location")
public class LocationController {

    private final LocationService locationService;

    /**
     * 본인의 현재 위치를 업데이트 해주는 API입니다.
     *
     * @param request
     * @param requestDto
     * @return
     */
    @PostMapping
    public ResponseEntity<BaseResponseDto<?>> updateLocation(HttpServletRequest request,
                                                             @RequestBody LocationRequestDto requestDto) {
        locationService.updateLocation(getUserId(request), requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new BaseResponseDto<>(201, "success"));
    }

    /**
     * 유저의 현재 위치를 가져오는 API입니다.
     *
     * @param userId
     * @return
     */
    @GetMapping("/{userId}")
    public ResponseEntity<BaseResponseDto<LocationResponseDto>> getLocation(@PathVariable("userId") Long userId) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new BaseResponseDto<>(200, "success", locationService.getLocation(userId)));
    }

    private Long getUserId(HttpServletRequest request) {
        return Long.parseLong(request.getHeader("userId"));
    }

}
