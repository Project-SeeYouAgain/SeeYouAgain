package com.example.productservice.exception;

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
    CART_NOT_EXIST_EXCEPTION(HttpStatus.NOT_FOUND, "C0001", "존재하지 않는 카트입니다."),
    PRODUCT_NOT_EXIST_EXCEPTION(HttpStatus.NOT_FOUND, "P0001", "존재하지 않는 상품입니다."),
    OWNER_NOT_MATCH_EXCEPTION(HttpStatus.CREATED, "P0001", "작성자가 아닙니다."),
    LENDER_NOT_MATCH_EXCEPTION(HttpStatus.CREATED, "L0001", "대여자가 아닙니다."),
    RESERVATION_NOT_EXIST_EXCEPTION(HttpStatus.NOT_FOUND, "RE0001", "존재하지 않는 예약입니다."),
    REVIEW_NOT_EXIST_EXCEPTION(HttpStatus.NOT_FOUND, "R0001", "존재하지 않는 리뷰입니다."),
    REVIEW_EXIST_EXCEPTION(HttpStatus.BAD_REQUEST, "R0002", "이미 리뷰가 존재합니다."),
    SERVER_NOT_CONNECT_EXCEPTION(HttpStatus.SERVICE_UNAVAILABLE, "S0001", "서비스가 연결되지 않았습니다.");

    private final HttpStatus status;
    private final String code;
    private final String message;
}
