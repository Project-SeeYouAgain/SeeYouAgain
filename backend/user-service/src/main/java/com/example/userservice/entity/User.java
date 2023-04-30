package com.example.userservice.entity;

import lombok.*;

import javax.persistence.*;
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

    private int mannerScore;

    private int mannerCnt;

    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Role> roleSet = new HashSet<>();

    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    public void updateProfile(String profileImgKey, String profileImgUrl) {
        this.profileImgKey = profileImgKey;
        this.profileImgUrl = profileImgUrl;
    }

    public void addUserRole(Role role) {
        roleSet.add(role);
    }
}
