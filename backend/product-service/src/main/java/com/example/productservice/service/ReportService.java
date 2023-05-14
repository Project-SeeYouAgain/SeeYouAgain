package com.example.productservice.service;

import com.example.productservice.dto.request.ReportRequestDto;

public interface ReportService {
    void createReport(Long userId, Long productId, ReportRequestDto requestDto);
}
