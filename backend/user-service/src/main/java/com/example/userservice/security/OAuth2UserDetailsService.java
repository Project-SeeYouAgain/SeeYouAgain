package com.example.userservice.security;

import com.example.userservice.entity.Role;
import com.example.userservice.entity.User;
import com.example.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Log4j2
@Service
@RequiredArgsConstructor
public class OAuth2UserDetailsService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        log.info("------------------------------");
        log.info("userRequest:" + userRequest);

        String clientName = userRequest.getClientRegistration().getClientName();

        log.info("clientName: " + clientName);
        log.info(userRequest.getAdditionalParameters());

        OAuth2User oAuth2User = super.loadUser(userRequest);

        log.info("==============================");
        oAuth2User.getAttributes().forEach((k,v) -> {
            log.info(k + " : " + v);
        });

        HashMap<String, String> map = oAuth2User.getAttribute("kakao_account");
        String email = map.get("email");

        log.info("EMAIL: " + email);

        User user = saveSocialMember(email);

        OAuthUserDetails userDetails = new OAuthUserDetails(
                user.getEmail(),
                user.getPassword(),
                user.getRoleSet()
                        .stream()
                        .map(role -> new SimpleGrantedAuthority("ROLE_" + role.name()))
                        .collect(toList()),
                oAuth2User.getAttributes()
        );
        userDetails.setName(user.getNickname());

        return userDetails;

    }

    private User saveSocialMember(String email) {

        Optional<User> result = userRepository.findByEmail(email);

        if (result.isPresent()) {
            return result.get();
        }

        String password = UUID.randomUUID().toString();

        User user = User.builder()
                .email(email)
                .password(new BCryptPasswordEncoder().encode(password))
                .mannerScore(50)
                .build();

        user.addUserRole(Role.USER);

        userRepository.save(user);

        return user;
    }

}

