package com.example.productservice.service;

import com.example.productservice.dto.request.ReportRequestDto;
import com.example.productservice.entity.Product;
import com.example.productservice.entity.Report;
import com.example.productservice.exception.ApiException;
import com.example.productservice.exception.ExceptionEnum;
import com.example.productservice.repository.ProductRepository;
import com.example.productservice.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService{

    private final ProductRepository productRepository;
    private final ReportRepository reportRepository;

    @Override
    @Transactional
    public void createReport(Long userId, Long productId, ReportRequestDto requestDto) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.PRODUCT_NOT_EXIST_EXCEPTION));

        Report report = Report.of(userId, product, requestDto);
        reportRepository.save(report);
    }
}
