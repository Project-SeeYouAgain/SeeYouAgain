import React, { useEffect, useState } from 'react';
import Header from '../../components/Container/components/Header';
import Profile from '../../components/Card/Profile';
import { MenuData1, MenuData2 } from '../../data/MenuData';
import Link from 'next/link';
import Container from '@/components/Container';
import Body from '@/components/Container/components/Body';
import { axBase } from '@/apis/axiosinstance';
import axios, { AxiosInstance } from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from 'recoil/user/atoms';
import Navbar from '@/components/Container/components/Navbar';
import { useRouter } from 'next/router';
import { Cookies } from 'react-cookie';
function MyPage() {
    interface profile {
        profileImg: string;
        nickname: string;
        location: string;
        description: string;
        mannerScore: number;
    }
    const cookie = new Cookies();
    const allCookies = cookie.getAll();
    const Router = useRouter();
    const logout = () => {
        for (const name in allCookies) {
            cookie.remove(name);
        }
        sessionStorage.removeItem('recoil-persist');

        Router.push('/');
    };
    const [profileData, setProfileData] = useState<profile | null>(null);
    const token = useRecoilValue(userState).accessToken;
    useEffect(() => {
        const url = `/user-service/auth/profile`;
        axBase(token)({ url })
            .then(res => {
                console.log(res.data.data);
                setProfileData(res.data.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <Container>
            <div>
                <Header title="마이페이지" />
                <Body className="mt-[3rem]">
                    {profileData ? (
                        <Profile
                            profileImg={profileData.profileImg}
                            nickname={profileData.nickname}
                            location={profileData.location}
                            description={profileData.description}
                            mannerScore={profileData.mannerScore}
                        />
                    ) : null}
                    <div className="mt-[2.3rem]">
                        <div className="flex flex-col">
                            <span className="font-bold dark:text-black text-[20px]">나의 거래</span>
                            {MenuData1.map((item, index) => (
                                <span className={`text-[16px] dark:text-black ${index === 0 ? 'mt-[1rem]' : 'mt-[0.5rem]'}`} key={index}>
                                    <Link href={item.url}>{item.title}</Link>
                                </span>
                            ))}
                        </div>
                        <div className="flex flex-col mt-[2.3rem]">
                            <span className="font-bold text-[20px] dark:text-black ">기타</span>
                            {MenuData2.map((item, index) => (
                                <span className={`text-[16px]  dark:text-black ${index === 0 ? 'mt-[1rem]' : 'mt-[0.5rem]'}`} key={index}>
                                    <Link href={item.url}>{item.title}</Link>
                                </span>
                            ))}
                            <span onClick={logout} className={`text-[16px] mt-[0.5rem] dark:text-black`}>
                                로그아웃
                            </span>
                        </div>
                    </div>
                </Body>
            </div>
            <Navbar />
        </Container>
    );
}

export default MyPage;
