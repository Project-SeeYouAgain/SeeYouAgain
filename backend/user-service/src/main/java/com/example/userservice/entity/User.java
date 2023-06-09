package com.example.userservice.entity;

import com.example.userservice.dto.request.user.ProfileUpdateRequestDto;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User extends TimeStamped {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(nullable = false, length = 50, unique = true)
    private String email;

    @Column(length = 20, unique = true)
    private String nickname;

    @Column(nullable = false)
    private String password;

    private String profileImgKey;

    private String profileImgUrl;

    private String location;

    private String description;

    private int mannerScore;

    private int mannerCnt;

    private String firebaseToken;

    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Role> roleSet = new HashSet<>();

    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    public void updateFirebaseToken(String firebaseToken) {
        this.firebaseToken = firebaseToken;
    }

    public void updateProfile(String profileImgKey, String profileImgUrl, String location, String description) {
        this.profileImgKey = profileImgKey;
        this.profileImgUrl = profileImgUrl;
        this.location = location;
        this.description = description;
    }

    public void updateProfile(String location, String description) {
        this.location = location;
        this.description = description;
    }

    public void addUserRole(Role role) {
        roleSet.add(role);
    }

}
