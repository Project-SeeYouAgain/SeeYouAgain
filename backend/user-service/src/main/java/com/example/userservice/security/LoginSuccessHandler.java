package com.example.userservice.security;

import com.example.userservice.entity.User;
import com.example.userservice.exception.ApiException;
import com.example.userservice.exception.ExceptionEnum;
import com.example.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Log4j2
@RequiredArgsConstructor
@Component
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JWTUtil jwtUtil;

    private final UserRepository userRepository;

    private final RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        log.info("----------------------------");
        log.info("onAuthenticationSuccess");

        OAuthUserDetails authMember = (OAuthUserDetails)authentication.getPrincipal();

        User user = userRepository.findByEmail(authMember.getEmail())
                .orElseThrow(() -> new ApiException(ExceptionEnum.MEMBER_NOT_EXIST_EXCEPTION));

        String token = jwtUtil.createToken(user.getId());
        String refreshToken = jwtUtil.createRefreshToken(user.getId());
        String name = user.getNickname();
        Long userId = user.getId();
        String profileImg = user.getProfileImgUrl();
        String location = user.getLocation();
        Integer mannerScore = user.getMannerScore();

        log.info("token" + token);
        log.info("name" + name);

        Cookie accessTokenCookie = new Cookie("accessToken", token);
        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        Cookie nickname = new Cookie("nickname", name);
        Cookie id = new Cookie("userId", userId.toString());
        Cookie profile = new Cookie("profileImg", profileImg);
        Cookie local = new Cookie("location", location);
        Cookie manner = new Cookie("mannerScore", mannerScore.toString());

        accessTokenCookie.setPath("/");
        refreshTokenCookie.setPath("/");
        nickname.setPath("/");
        id.setPath("/");
        profile.setPath("/");
        local.setPath("/");
        manner.setPath("/");

        accessTokenCookie.setMaxAge(60 * 60 * 24);
        refreshTokenCookie.setMaxAge(60 * 60 * 24);
        nickname.setMaxAge(60 * 60 * 24);
        id.setMaxAge(60 * 60 * 24);
        profile.setMaxAge(60 * 60 * 24);
        local.setMaxAge(60 * 60 * 24);
        manner.setMaxAge(60 * 60 * 24);

        response.addCookie(accessTokenCookie);
        response.addCookie(refreshTokenCookie);
        response.addCookie(nickname);
        response.addCookie(id);
        response.addCookie(profile);
        response.addCookie(local);
        response.addCookie(manner);

        String url = makeRedirectUrl();

        redirectStrategy.sendRedirect(request, response, url);
    }

    private String makeRedirectUrl() {
        return UriComponentsBuilder.fromUriString("https://localhost/redirect")
                .build().toUriString();
    }
}
