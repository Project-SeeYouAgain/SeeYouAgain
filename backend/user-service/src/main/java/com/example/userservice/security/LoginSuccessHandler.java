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
        String name = user.getNickname();

        log.info("token" + token);
        log.info("name" + name);

        Cookie accessTokenCookie = new Cookie("accessToken", token);
        Cookie nickname = new Cookie("nickname", name);

        accessTokenCookie.setPath("/");
        nickname.setPath("/");

        accessTokenCookie.setMaxAge(60 * 60 * 24);
        nickname.setMaxAge(60 * 60 * 24);

        response.addCookie(accessTokenCookie);
        response.addCookie(nickname);

        String url = makeRedirectUrl();

        redirectStrategy.sendRedirect(request, response, url);
    }

    private String makeRedirectUrl() {
        return UriComponentsBuilder.fromUriString("http://localhost:3000/home")
                .build().toUriString();
    }
}
