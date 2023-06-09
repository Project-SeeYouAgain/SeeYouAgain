package com.example.userservice.service;

import com.example.userservice.dto.request.chatting.ProfileImgRequestDto;
import com.example.userservice.dto.request.fcm.FCMTokenRequestDto;
import com.example.userservice.dto.request.user.NicknameRequestDto;
import com.example.userservice.dto.request.user.ProfileUpdateRequestDto;
import com.example.userservice.dto.response.user.ProfileResponseDto;
import com.example.userservice.entity.User;
import com.example.userservice.exception.ApiException;
import com.example.userservice.exception.ExceptionEnum;
import com.example.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    private final AmazonS3Service amazonS3Service;

    private final KafkaProducer kafkaProducer;

    @Override
    @Transactional(readOnly = true)
    public ProfileResponseDto getProfile(Long userId) {
        User user = getUser(userId);
        return ProfileResponseDto.from(user);
    }

    @Override
    @Transactional
    public ProfileResponseDto updateProfile(Long userId, ProfileUpdateRequestDto requestDto, MultipartFile profileImg) {
        User user = getUser(userId);

        String location = requestDto.getLocation();
        String description = requestDto.getDescription();

        if (profileImg == null) {
            System.out.println(3);
            user.updateProfile(location, description);
        } else {
            deleteS3Img(user);
            String profileImgKey = saveS3Img(profileImg);
            String profileImgUrl = amazonS3Service.getFileUrl(profileImgKey);
            user.updateProfile(profileImgKey, profileImgUrl, location, description);
            kafkaProducer.send("example-participant-topic", new ProfileImgRequestDto(userId, profileImgUrl));
        }

        return ProfileResponseDto.from(user);
    }

    private String saveS3Img(MultipartFile profileImg) {
        try {
            return amazonS3Service.upload(profileImg, "UserProfile");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public void deleteUser(Long userId) {
        User user = getUser(userId);

        // S3 서버에서 프로필 이미지 삭제
        deleteS3Img(user);

        // 회원 탈퇴
        userRepository.delete(user);
    }

    private void deleteS3Img(User user) {
        if (user.getProfileImgKey() != null && !user.getProfileImgKey().isBlank())
            amazonS3Service.delete(user.getProfileImgKey());
    }

    @Override
    @Transactional
    public String updateNickname(Long userId, NicknameRequestDto requestDto) {
        User user = getUser(userId);

        // 이미 존재하는 닉네임이면
        Optional<User> findUser = userRepository.findByNickname(requestDto.getNickname());
        if (findUser.isPresent()) throw new ApiException(ExceptionEnum.NICKNAME_EXIST_EXCEPTION);

        user.updateNickname(requestDto.getNickname());
        return user.getNickname();
    }

    @Override
    @Transactional
    public void updateFCMToken(Long userId, FCMTokenRequestDto requestDto) {
        User user = getUser(userId);

        String firebaseToken = requestDto.getFirebaseToken();

        user.updateFirebaseToken(firebaseToken);
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.MEMBER_NOT_EXIST_EXCEPTION));
    }

}