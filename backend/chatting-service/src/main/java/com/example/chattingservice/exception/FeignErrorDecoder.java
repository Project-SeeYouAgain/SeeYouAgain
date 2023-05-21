package com.example.chattingservice.exception;

import feign.Response;
import feign.codec.ErrorDecoder;
import org.springframework.stereotype.Component;

@Component
public class FeignErrorDecoder implements ErrorDecoder {

    @Override
    public Exception decode(String methodKey, Response response) {

        if (response.status() == 503) {
            return new ApiException(ExceptionEnum.SERVER_NOT_CONNECT_EXCEPTION);
        } else if (response.status() == 404) {
        }
        return new Exception(response.reason());
    }
}
