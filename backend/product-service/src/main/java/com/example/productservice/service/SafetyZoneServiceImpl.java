package com.example.productservice.service;


import com.example.productservice.dto.response.CartResponseDto;
import com.example.productservice.dto.response.CctvResponseDto;
import com.example.productservice.entity.Cctv;
import com.example.productservice.entity.Product;
import com.example.productservice.entity.ProductImg;
import com.example.productservice.repository.CctvRepository;
import com.example.productservice.repository.LightRepository;
import com.example.productservice.repository.PoliceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class SafetyZoneServiceImpl implements SafetyZoneService {

    private final PoliceRepository policeRepository;
    private final CctvRepository cctvRepository;
    private final LightRepository lightRepository;

    @Override
    public List<CctvResponseDto> getCctvList(String location) {
        List<Cctv> cctvList = cctvRepository.findAllByAddressContains(location);
        return cctvList.stream().map(CctvResponseDto::from).collect(toList());
    }
}
