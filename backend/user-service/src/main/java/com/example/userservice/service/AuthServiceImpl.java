package com.example.userservice.service;

import com.example.userservice.dto.request.user.NicknameRequestDto;
import com.example.userservice.dto.request.user.ProfileUpdateRequestDto;
import com.example.userservice.dto.response.user.ProfileResponseDto;
import com.example.userservice.entity.User;
import com.example.userservice.exception.ApiException;
import com.example.userservice.exception.ExceptionEnum;
import com.example.userservice.repository.MannerCommentRepository;
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

    @Override
    @Transactional(readOnly = true)
    public ProfileResponseDto getProfile(Long userId) {
        User user = getUser(userId);
        return ProfileResponseDto.from(user);
    }

    @Override
    @Transactional
    public ProfileResponseDto updateProfile(Long userId, ProfileUpdateRequestDto requestDto) {
        User user = getUser(userId);

        MultipartFile profileImg = requestDto.getProfileImg();
        String location = requestDto.getLocation();
        String description = requestDto.getDescription();

        deleteS3Img(user);
        user.updateProfile(null, null, location, description);

        return ProfileResponseDto.from(user);
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

    @Override
    @Transactional
    public String updateProfileImg(Long userId, MultipartFile profileImg) {
        User user = getUser(userId);

        deleteS3Img(user);

        String fileName = saveS3Img(profileImg);
        String fileUrl = amazonS3Service.getFileUrl(fileName);
        user.updateProfile(fileName, fileUrl);

        return user.getProfileImgUrl();
    }

    private void deleteS3Img(User user) {
        if (user.getProfileImgKey() != null && !user.getProfileImgKey().isBlank())
            amazonS3Service.delete(user.getProfileImgKey());
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
    public String updateNickname(Long userId, NicknameRequestDto requestDto) {
        User user = getUser(userId);

        // 이미 존재하는 닉네임이면
        Optional<User> findUser = userRepository.findByNickname(requestDto.getNickname());
        if (findUser.isPresent()) throw new ApiException(ExceptionEnum.NICKNAME_EXIST_EXCEPTION);

        user.updateNickname(requestDto.getNickname());
        return user.getNickname();
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.MEMBER_NOT_EXIST_EXCEPTION));
    }

}