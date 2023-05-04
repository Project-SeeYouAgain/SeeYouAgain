package com.example.productservice.service;

import com.example.productservice.dto.request.SafetyZoneRequestDto;
import com.example.productservice.dto.response.SafetyZoneResponseDto;
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
    public List<SafetyZoneResponseDto> getCctvList(SafetyZoneRequestDto safetyZoneRequestDto) {
        List<Cctv> cctvList = cctvRepository.findAllByAddressContains(safetyZoneRequestDto.getLocation());
        return cctvList.stream().map(SafetyZoneResponseDto::from).collect(toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<SafetyZoneResponseDto> getPoliceList(SafetyZoneRequestDto safetyZoneRequestDto) {
        List<Police> policeList = policeRepository.findAllByAddressContains(safetyZoneRequestDto.getLocation());
        return policeList.stream().map(SafetyZoneResponseDto::from).collect(toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<SafetyZoneResponseDto> getLightList(SafetyZoneRequestDto safetyZoneRequestDto) {
        List<Light> lightList = lightRepository.findAllByAddressContains(safetyZoneRequestDto.getLocation());
        return lightList.stream().map(SafetyZoneResponseDto::from).collect(toList());
    }
}
