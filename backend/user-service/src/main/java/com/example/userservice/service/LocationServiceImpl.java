package com.example.userservice.service;

import com.example.userservice.dto.request.user.LocationRequestDto;
import com.example.userservice.dto.response.user.LocationResponseDto;
import com.example.userservice.entity.Location;
import com.example.userservice.entity.User;
import com.example.userservice.exception.ApiException;
import com.example.userservice.exception.ExceptionEnum;
import com.example.userservice.repository.LocationRepository;
import com.example.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class LocationServiceImpl implements LocationService {

    private final UserRepository userRepository;
    private final LocationRepository locationRepository;

    @Override
    @Transactional
    public void updateLocation(Long userId, LocationRequestDto requestDto) {

        Float lat = requestDto.getLat();
        Float lng = requestDto.getLng();
        Boolean moving = requestDto.getMoving();

        Optional<Location> findLocation = locationRepository.findByUserId(userId);

        if (findLocation.isEmpty()) {
            Location location = Location.of(getUser(userId), lat, lng, moving);
            locationRepository.save(location);
            return;
        }

        findLocation.get().updateLatLngMoving(lat, lng, moving);
    }

    @Override
    @Transactional(readOnly = true)
    public LocationResponseDto getLocationInfo(Long userId) {
        return LocationResponseDto.from(getLocation(userId));
    }

    @Override
    @Transactional
    public void deleteLocation(Long userId) {
        locationRepository.delete(getLocation(userId));
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.MEMBER_NOT_EXIST_EXCEPTION));
    }

    private Location getLocation(Long userId) {
        return locationRepository.findByUserId(userId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.LOCATION_NOT_EXIST_EXCEPTION));
    }
}
