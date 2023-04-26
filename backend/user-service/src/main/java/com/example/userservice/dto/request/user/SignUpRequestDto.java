package com.example.userservice.dto.request.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
public class SignUpRequestDto {

    private String userId;

    @NotBlank(message = "Email cannot be null")
    @Size(min = 2, message = "Email not be less than two characters")
    @Email
    private String email;

    @NotBlank(message = "Password cannot be null")
    @Size(min = 8, message = "Password must be equal or grater than 8 characters")
    private String password;

    @NotBlank(message = "Nickname cannot be null")
    @Size(min = 2, message = "Nickname not be less than two characters")
    private String nickname;

}
