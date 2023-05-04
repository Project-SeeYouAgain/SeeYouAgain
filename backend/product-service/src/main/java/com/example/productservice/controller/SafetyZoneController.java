package com.example.productservice.controller;

import com.example.productservice.dto.BaseResponseDto;
import com.example.productservice.dto.request.SafetyZoneRequestDto;
import com.example.productservice.dto.response.SafetyZoneResponseDto;
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

    @GetMapping("/cctv")
    public ResponseEntity<BaseResponseDto<List<SafetyZoneResponseDto>>> getCctvList(@RequestBody
                                                                                    SafetyZoneRequestDto safetyZoneRequestDto) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success", safetyZoneService.getCctvList(safetyZoneRequestDto)));
    }

    @GetMapping("/police")
    public ResponseEntity<BaseResponseDto<List<SafetyZoneResponseDto>>> getPoliceList(@RequestBody
                                                                                          SafetyZoneRequestDto safetyZoneRequestDto) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success", safetyZoneService.getPoliceList(safetyZoneRequestDto)));
    }

    @GetMapping("/light")
    public ResponseEntity<BaseResponseDto<List<SafetyZoneResponseDto>>> getLightList(@RequestBody
                                                                                         SafetyZoneRequestDto safetyZoneRequestDto) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success", safetyZoneService.getLightList(safetyZoneRequestDto)));
    }
}
