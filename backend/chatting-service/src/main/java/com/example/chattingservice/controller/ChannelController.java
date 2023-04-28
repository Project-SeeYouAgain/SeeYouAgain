package com.example.chattingservice.controller;

import com.example.chattingservice.dto.BaseResponseDto;
import com.example.chattingservice.dto.request.ChannelRequestDto;
import com.example.chattingservice.dto.response.ChannelResponseDto;
import com.example.chattingservice.dto.response.MessageResponseDto;
import com.example.chattingservice.service.ChannelService;
import com.example.chattingservice.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth/channel")
public class ChannelController {

    private final ChannelService channelService;

    private final MessageService messageService;

    @GetMapping("/{type}")
    public ResponseEntity<BaseResponseDto<List<ChannelResponseDto>>> getChannelList(HttpServletRequest request,
                                                                                    @PathVariable("type") String type) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success", channelService.getChannelList(getUserId(request), type)));
    }

    @PostMapping
    public ResponseEntity<BaseResponseDto<Void>> createChannel(HttpServletRequest request,
                                                               @RequestBody ChannelRequestDto requestDto) {
        channelService.createChannel(getUserId(request), requestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new BaseResponseDto<>(201, "success"));
    }

    @GetMapping("/{identifier}/{firstMessageId}")
    public ResponseEntity<BaseResponseDto<List<MessageResponseDto>>> getMessageList(@PathVariable("identifier") String identifier,
                                                                                    @PathVariable("firstMessageId") Long firstMessageId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponseDto<>(200, "success", messageService.getMessageByChannelId(identifier, firstMessageId)));
    }

    private Long getUserId(HttpServletRequest request) {
        return Long.parseLong(request.getHeader("userId"));
    }

}
