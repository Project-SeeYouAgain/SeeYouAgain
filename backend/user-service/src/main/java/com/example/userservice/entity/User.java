package com.example.userservice.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(nullable = false, length = 50, unique = true)
    private String email;

    @Column(nullable = false, length = 20, unique = true)
    private String nickname;

    @Column(nullable = false)
    private String password;

    private String profileImgKey;

    private String profileImgUrl;

    private String location;

    private int mannerScore;

    private int mannerCnt;

    @Enumerated(EnumType.STRING)
    @Setter
    private Role role;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime modifiedAt;

    private String provider;    // oauth2를 이용할 경우 어떤 플랫폼을 이용하는지
    private String providerId;  // oauth2를 이용할 경우 아이디값

    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    public void updateProfile(String profileImgKey, String profileImgUrl) {
        this.profileImgKey = profileImgKey;
        this.profileImgUrl = profileImgUrl;
    }

    public User update(String nickname, String profileImgUrl) {
        this.nickname = nickname;
        this.profileImgUrl = profileImgUrl;

        return this;
    }

    public String getRoleKey() {
        return this.role.getKey();
    }


}
