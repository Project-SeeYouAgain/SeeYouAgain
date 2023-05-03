package com.example.userservice.config;

import com.example.userservice.security.LoginSuccessHandler;
import com.example.userservice.security.OAuth2UserDetailsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration
@Log4j2
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final Environment env;
    private final OAuth2UserDetailsService oAuth2UserDetailsService;
    private final LoginSuccessHandler successHandler;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        String gatewayIpAddress = env.getProperty("gateway.ip");
        String productIpAddress = env.getProperty("product-service.ip");
        String chattingIpAddress = env.getProperty("chatting-service.ip");

        http
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/error/**").permitAll()
                .antMatchers("/h2-console/**").permitAll()
                .antMatchers("/**")
                .access("hasIpAddress('" + gatewayIpAddress + "') or " +
                        "hasIpAddress('" + productIpAddress + "') or " +
                        "hasIpAddress('" + chattingIpAddress + "')"
                )
                .and()
                .oauth2Login().userInfoEndpoint().userService(oAuth2UserDetailsService)
                .and().successHandler(successHandler)
                .and()
                .headers().frameOptions().disable();

        return http.build();
    }
}
