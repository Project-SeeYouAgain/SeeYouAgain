package com.example.userservice.service;

import com.example.userservice.dto.request.user.MannerCommentRequestDto;
import com.example.userservice.entity.MannerComment;
import com.example.userservice.entity.User;
import com.example.userservice.exception.ApiException;
import com.example.userservice.exception.ExceptionEnum;
import com.example.userservice.repository.MannerCommentRepository;
import com.example.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MannerCommentServiceImpl implements MannerCommentService {

    private final UserRepository userRepository;

    private final MannerCommentRepository mannerCommentRepository;

    @Override
    @Transactional
    public void rateUser(Long raterId, MannerCommentRequestDto requestDto, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.MEMBER_NOT_EXIST_EXCEPTION));

        MannerComment mannerComment = MannerComment.of(raterId, requestDto, user);

        mannerCommentRepository.save(mannerComment);
    }

}