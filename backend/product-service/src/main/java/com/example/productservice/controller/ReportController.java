package com.example.productservice.controller;

import com.example.productservice.dto.BaseResponseDto;
import com.example.productservice.dto.request.ReportRequestDto;
import com.example.productservice.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth/report")
public class ReportController {

    private final ReportService reportService;

    @PostMapping("/{productId}")
    public ResponseEntity<BaseResponseDto<ReportRequestDto>> createReport(HttpServletRequest request,
                                                                          @PathVariable("productId") Long productId,
                                                                          @RequestBody ReportRequestDto requestDto) {
        reportService.createReport(getUserId(request), productId, requestDto);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success"));
    }

    public Long getUserId(HttpServletRequest request) {
        return Long.parseLong(request.getHeader("userId"));
    }

}
