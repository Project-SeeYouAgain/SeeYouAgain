package com.example.userservice.controller;

import com.example.userservice.dto.BaseResponseDto;
import com.example.userservice.dto.request.user.LoginRequestDto;
import com.example.userservice.dto.request.user.NicknameCheckRequestDto;
import com.example.userservice.dto.request.user.SignUpRequestDto;
import com.example.userservice.dto.response.user.LoginResponseDto;
import com.example.userservice.dto.response.user.TokenResponseDto;
import com.example.userservice.dto.response.user.UserResponseDto;
import com.example.userservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/")
public class UserController {

    private final Environment env;
    private final UserService userService;

    @GetMapping("/health_check")
    public String status() {
        return String.format("It's Working in User Service on PORT %s", env.getProperty("local.server.port"));
    }

    /**
     * 회원가입 API 입니다.
     *
     * @param requestDto
     */
    @PostMapping("/join")
    public ResponseEntity<BaseResponseDto<?>> join(@Valid @RequestBody SignUpRequestDto requestDto) {
        userService.join(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new BaseResponseDto<>(201, "success"));
    }

    /**
     * 로그인 API 입니다.
     *
     * @param requestDto
     * @return
     */
    @PostMapping("/login")
    public ResponseEntity<BaseResponseDto<LoginResponseDto>> login(@Valid @RequestBody LoginRequestDto requestDto) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success", userService.login(requestDto)));
    }

    /**
     * 닉네임을 중복검사하는 API 입니다.
     *
     * @param requestDto
     */
    @PostMapping("/nickname")
    public ResponseEntity<BaseResponseDto<?>> nicknameCheck(@RequestBody NicknameCheckRequestDto requestDto) {
        userService.nicknameCheck(requestDto.getNewNickname());
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseDto<>(200, "success"));
    }

    /**
     * 마이크로 서비스에서 사용자 정보를 FeignClient 로 가져가기 위한 API 입니다.
     *
     * @param userId
     * @return
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<BaseResponseDto<UserResponseDto>> getUserInfo(@PathVariable Long userId) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success", userService.getUserInfo(userId)));
    }

    /**
     * accessToken 을 refresh 하는 API 입니다.
     *
     * @param request
     * @return
     */
    @GetMapping("/refresh")
    public ResponseEntity<BaseResponseDto<TokenResponseDto>> refresh(HttpServletRequest request) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success", userService.refresh(request)));
    }

}
