package com.example.userservice.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ExceptionEnum {
    RUNTIME_EXCEPTION(HttpStatus.BAD_REQUEST, "E0001", "내부 문제로 다음번에 다시 시도해주세요."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "E0002", "내부 문제로 다음번에 다시 시도해주세요."),
    API_NOT_EXIST_EXCEPTION(HttpStatus.NOT_FOUND, "E0003", "존재하지 않는 API 입니다."),
    API_METHOD_NOT_ALLOWED_EXCEPTION(HttpStatus.METHOD_NOT_ALLOWED, "E0004", "지원하지 않는 Method 입니다."),
    API_PARAMETER_EXCEPTION(HttpStatus.BAD_REQUEST, "E0005", "파라미터 타입과 값을 확인하세요."),
    MEMBER_ACCESS_EXCEPTION(HttpStatus.FORBIDDEN, "M0001", "접근 권한이 없습니다."),
    MEMBER_EXIST_EXCEPTION(HttpStatus.BAD_REQUEST,"M0002","이미 존재하는 유저입니다."),
    MEMBER_NOT_EXIST_EXCEPTION(HttpStatus.NOT_FOUND,"M0003", "존재하지 않는 계정입니다."),
    PASSWORD_NOT_MATCHED_EXCEPTION(HttpStatus.FORBIDDEN, "M0004", "비밀번호가 일치하지 않습니다."),
    MEMBER_INFO_NOT_MATCHED_EXCEPTION(HttpStatus.NOT_FOUND, "M0006", "일치하는 유저가 없습니다."),
    NICKNAME_EXIST_EXCEPTION(HttpStatus.BAD_REQUEST,"M0007","이미 존재하는 닉네임입니다."),
    CART_NOT_EXIST_EXCEPTION(HttpStatus.NOT_FOUND,"M0008","존재하지 않는 찜내역입니다."),
    LOCATION_NOT_EXIST_EXCEPTION(HttpStatus.NOT_FOUND,"M0009","해당 유저의 위치 내역이 존재하지 않습니다."),
    SERVER_NOT_CONNECT_EXCEPTION(HttpStatus.SERVICE_UNAVAILABLE, "S0001", "서비스가 연결되지 않았습니다.");
    private final HttpStatus status;
    private final String code;
    private final String message;

}