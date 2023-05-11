package com.example.chattingservice.controller;

import com.example.chattingservice.dto.BaseResponseDto;
import com.example.chattingservice.dto.request.ProfileImgRequestDto;
import com.example.chattingservice.service.ParticipantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth/participant")
public class ParticipantController {

    private final ParticipantService participantService;

    @PatchMapping("/in/{identifier}")
    public ResponseEntity<BaseResponseDto<?>> enterChatRoom(HttpServletRequest request,
                                                            @PathVariable("identifier") String identifier) {

        participantService.enterChatRoom(getUserId(request), identifier);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success"));
    }

    @PatchMapping("/out/{identifier}/{lastReadMessageId}")
    public ResponseEntity<BaseResponseDto<?>> outChatRoom(HttpServletRequest request,
                                                          @PathVariable("identifier") String identifier,
                                                          @PathVariable("lastReadMessageId") Long lastReadMessageId) {

        participantService.outChatRoom(getUserId(request), identifier, lastReadMessageId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success"));
    }

    @PatchMapping("/{userId}")
    public ResponseEntity<BaseResponseDto<?>> updateProfileImg(@PathVariable("userId") Long userId,
                                                               @RequestBody ProfileImgRequestDto requestDto) {

        participantService.updateProfileImg(userId, requestDto);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success"));
    }

    private Long getUserId(HttpServletRequest request) {
        return Long.parseLong(request.getHeader("userId"));
    }
}
