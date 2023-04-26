package com.example.userservice.config;

import com.example.userservice.exception.ApiException;
import com.example.userservice.exception.ApiExceptionEntity;
import com.example.userservice.exception.ExceptionEnum;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.nio.file.AccessDeniedException;

@RestControllerAdvice
public class ApiExceptionAdvice {

    /**
     * API 에러 핸들링입니다.
     * 아래의 경우로 에러를 발생하면 해당 예외처리기에서 클라이언트로 응답합니다.
     *
     * ex)
     * throw new ApiException(ExceptionEnum.RUNTIME_EXCEPTION);
     * @param e
     * @return
     */
    @ExceptionHandler({ApiException.class})
    public ResponseEntity<ApiExceptionEntity> apiExceptionHandler(final ApiException e) {

        return new ResponseEntity<ApiExceptionEntity>(
                new ApiExceptionEntity(
                        e.getError().getCode(),
                        e.getError().getMessage()
                ),
                e.getError().getStatus()
        );

    }

    /**
     * 존재하지 않는 API에 대한 기본 메세지 처리입니다.
     * @return
     */
    @ExceptionHandler({NoHandlerFoundException.class})
    public ResponseEntity<ApiExceptionEntity> notFoundExceptionHandler() {
        ApiException e = new ApiException(ExceptionEnum.API_NOT_EXIST_EXCEPTION);
        return new ResponseEntity<ApiExceptionEntity>(
                new ApiExceptionEntity(
                        e.getError().getCode(),
                        e.getError().getMessage()
                ),
                e.getError().getStatus()
        );
    }

    /**
     * 런타임 예외에 대한 처리입니다.
     * @return
     */
    @ExceptionHandler({RuntimeException.class})
    public ResponseEntity<ApiExceptionEntity> runTimeExceptionHandler() {
        ApiException e = new ApiException(ExceptionEnum.RUNTIME_EXCEPTION);
        return new ResponseEntity<ApiExceptionEntity>(
                new ApiExceptionEntity(
                        e.getError().getCode(),
                        e.getError().getMessage()
                ),
                e.getError().getStatus()
        );
    }

    /**
     * 경로는 있으나 메서드가 다를 경우 405 예외를 리턴합니다.
     * @return
     */
    @ExceptionHandler({HttpRequestMethodNotSupportedException.class})
    public ResponseEntity<ApiExceptionEntity> methodNotSupportExceptionHandler() {

        ApiException e = new ApiException(ExceptionEnum.API_METHOD_NOT_ALLOWED_EXCEPTION);
        return new ResponseEntity<ApiExceptionEntity>(
                new ApiExceptionEntity(
                        e.getError().getCode(),
                        e.getError().getMessage()
                ),
                e.getError().getStatus()
        );
    }

    /**
     * 전체 예외에 대한 기본 처리입니다.
     * @return
     */
    @ExceptionHandler({Exception.class})
    public ResponseEntity<ApiExceptionEntity> internalServerExceptionHandler() {

        ApiException e = new ApiException(ExceptionEnum.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<ApiExceptionEntity>(
                new ApiExceptionEntity(
                        e.getError().getCode(),
                        e.getError().getMessage()
                ),
                e.getError().getStatus()
        );
    }

    /**
     * 파라미터 검증에서 실패했을 경우 기본 처리입니다.
     * @return
     */
    @ExceptionHandler(value = {
            MethodArgumentNotValidException.class,
            MissingServletRequestParameterException.class
    })
    public ResponseEntity<ApiExceptionEntity> parameterException() {

        ApiException e = new ApiException(ExceptionEnum.API_PARAMETER_EXCEPTION);
        return new ResponseEntity<ApiExceptionEntity>(
                new ApiExceptionEntity(
                        e.getError().getCode(),
                        e.getError().getMessage()
                ),
                e.getError().getStatus()
        );
    }

    /**
     * Spring Security 에 권한이 없는 사용자가 접근 시 기본 처리입니다.
     * @return
     */
    @ExceptionHandler({AccessDeniedException.class})
    public ResponseEntity<ApiExceptionEntity> accessDeniedException() {

        ApiException e = new ApiException(ExceptionEnum.MEMBER_ACCESS_EXCEPTION);
        return new ResponseEntity<ApiExceptionEntity>(
                new ApiExceptionEntity(
                        e.getError().getCode(),
                        e.getError().getMessage()
                ),
                e.getError().getStatus()
        );
    }

}
