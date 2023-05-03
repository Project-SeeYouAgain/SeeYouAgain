package com.example.productservice.controller;

import com.example.productservice.dto.BaseResponseDto;
import com.example.productservice.dto.response.CctvResponseDto;
import com.example.productservice.dto.response.LightResponseDto;
import com.example.productservice.dto.response.PoliceResponseDto;
import com.example.productservice.service.SafetyZoneService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth/safe")
public class SafetyZoneController {

    private final SafetyZoneService safetyZoneService;

    @GetMapping("/cctv/{location}")
    public ResponseEntity<BaseResponseDto<List<CctvResponseDto>>> getCctvList(@PathVariable("location")
                                                                                      String location) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success", safetyZoneService.getCctvList(location)));
    }

    @GetMapping("/police/{location}")
    public ResponseEntity<BaseResponseDto<List<PoliceResponseDto>>> getPoliceList(@PathVariable("location")
                                                                              String location) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success", safetyZoneService.getPoliceList(location)));
    }

    @GetMapping("/light/{location}")
    public ResponseEntity<BaseResponseDto<List<LightResponseDto>>> getLightList(@PathVariable("location")
                                                                              String location) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success", safetyZoneService.getLightList(location)));
    }
}
