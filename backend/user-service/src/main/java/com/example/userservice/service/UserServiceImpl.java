package com.example.userservice.service;

import com.example.userservice.dto.request.user.*;
import com.example.userservice.dto.response.user.LoginResponseDto;
import com.example.userservice.dto.response.user.TokenResponseDto;
import com.example.userservice.dto.response.user.UserResponseDto;
import com.example.userservice.entity.User;
import com.example.userservice.exception.ApiException;
import com.example.userservice.exception.ExceptionEnum;
import com.example.userservice.repository.UserRepository;
import com.example.userservice.security.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JWTUtil jwtUtil;

    private final RedisService redisService;

    @Override
    public UserResponseDto join(SignUpRequestDto requestDto) {
        requestDto.setUserId(UUID.randomUUID().toString());

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        User user = mapper.map(requestDto, User.class);
        user.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        user.setMannerScore(50);
        user.setMannerCnt(0);

        userRepository.save(user);

        return UserResponseDto.from(user);
    }

    @Override
    @Transactional
    public LoginResponseDto login(LoginRequestDto requestDto) {
        User user = userRepository.findByEmail(requestDto.getEmail())
                .orElseThrow(() -> new ApiException(ExceptionEnum.MEMBER_NOT_EXIST_EXCEPTION));

        if (!passwordEncoder.matches(requestDto.getPassword(), user.getPassword())) {
            throw new ApiException(ExceptionEnum.PASSWORD_NOT_MATCHED_EXCEPTION);
        }

        String accessToken = jwtUtil.createToken(user.getId());
        String refreshToken = jwtUtil.createRefreshToken(user.getId());

        redisService.setValues(refreshToken, user.getId());

        return LoginResponseDto.of(UserResponseDto.from(user), accessToken, refreshToken);
    }

    @Override
    @Transactional(readOnly = true)
    public void nicknameCheck(String nickname) {
        Optional<User> user = userRepository.findByNickname(nickname);

        if (user.isPresent()) {
            log.error("이미 사용중인 닉네입입니다.");
            throw new ApiException(ExceptionEnum.MEMBER_EXIST_EXCEPTION);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponseDto getUserInfo(Long userId) {
        User user = getUser(userId);
        return UserResponseDto.from(user);
    }

    @Override
    @Transactional
    public TokenResponseDto refresh(HttpServletRequest request) {
        String accessToken = jwtUtil.resolveToken(request, "authorization");
        String refreshToken = jwtUtil.resolveToken(request, "refreshtoken");

        Long userId = tokenValidation(accessToken, refreshToken);

        String newAccessToken = jwtUtil.createToken(userId);
        String newRefreshToken = jwtUtil.createRefreshToken(userId);

        redisService.setValues(newRefreshToken, userId);

        return TokenResponseDto.of(newAccessToken, newRefreshToken);
    }

    private Long tokenValidation(String accessToken, String refreshToken) {

        // 리프레쉬 토큰과 액세스 토큰 null 체크
        if (accessToken == null || refreshToken == null) {
            log.error("accessToken or refreshToken null");
            throw new ApiException(ExceptionEnum.MEMBER_ACCESS_EXCEPTION);
        }

        // 리프레쉬 토큰 유효성 검사 - 만료시 에러
        if (!jwtUtil.validateToken(refreshToken)) {
            log.error("refreshToken not valid");
            throw new ApiException(ExceptionEnum.MEMBER_ACCESS_EXCEPTION);
        }

        Long refreshTokenPk = Long.parseLong(jwtUtil.getUserPk(refreshToken));
        String refreshTokenRedis = redisService.getValues(refreshTokenPk);

        // 헤더 리프레쉬 토큰과 레디스 리프레쉬 토큰 동등성 비교
        if (!refreshToken.equals(refreshTokenRedis)) {
            log.error("accessToken and refreshToken not equals");
            throw new ApiException(ExceptionEnum.MEMBER_ACCESS_EXCEPTION);
        }

        // 액세스 토큰 유효성 검사 - 통과했을 때 해킹으로 간주
        if (jwtUtil.validateToken(accessToken)) {
            log.error("accessToken is valid");
            throw new ApiException(ExceptionEnum.MEMBER_ACCESS_EXCEPTION);
        }

        return refreshTokenPk;
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.MEMBER_NOT_EXIST_EXCEPTION));
    }

}
