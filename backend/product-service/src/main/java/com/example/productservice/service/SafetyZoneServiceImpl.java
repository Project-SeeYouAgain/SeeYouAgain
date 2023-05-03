package com.example.productservice.service;

import com.example.productservice.dto.response.CctvResponseDto;
import com.example.productservice.dto.response.LightResponseDto;
import com.example.productservice.dto.response.PoliceResponseDto;
import com.example.productservice.entity.Cctv;
import com.example.productservice.entity.Light;
import com.example.productservice.entity.Police;
import com.example.productservice.repository.CctvRepository;
import com.example.productservice.repository.LightRepository;
import com.example.productservice.repository.PoliceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class SafetyZoneServiceImpl implements SafetyZoneService {

    private final CctvRepository cctvRepository;
    private final PoliceRepository policeRepository;
    private final LightRepository lightRepository;

    @Override
    @Transactional(readOnly = true)
    public List<CctvResponseDto> getCctvList(String location) {
        List<Cctv> cctvList = cctvRepository.findAllByAddressContains(location);
        return cctvList.stream().map(CctvResponseDto::from).collect(toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PoliceResponseDto> getPoliceList(String location) {
        List<Police> policeList = policeRepository.findAllByAddressContains(location);
        return policeList.stream().map(PoliceResponseDto::from).collect(toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<LightResponseDto> getLightList(String location) {
        List<Light> lightList = lightRepository.findAllByAddressContains(location);
        return lightList.stream().map(LightResponseDto::from).collect(toList());
    }
}
