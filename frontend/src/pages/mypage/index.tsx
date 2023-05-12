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
import { MdLogout } from 'react-icons/md';

function MyPage() {
    interface profile {
        profileImg: string;
        nickname: string;
        location: string;
        description: string;
        mannerScore: number;
    }
    const cookie = new Cookies();
    const Router = useRouter();
    const logout = () => {
        cookie.remove('nickname');
        cookie.remove('userId');
        cookie.remove('location');
        cookie.remove('accessToken');
        cookie.remove('refreshToken');
        cookie.remove('mannerScore');
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
                <Body className="mt-[1rem]">
                    {profileData ? (
                        <Profile
                            profileImg={profileData.profileImg}
                            nickname={profileData.nickname}
                            location={profileData.location}
                            description={profileData.description}
                            mannerScore={profileData.mannerScore}
                        />
                    ) : null}
                    <div className="flex flex-col py-4 pt-8">
                        <div className="grid grid-rows-3 gap-2 mt-2">
                            <span className="font-bold dark:text-black text-[20px]">나의 거래</span>
                            {MenuData1.map((item, index) => (
                                <span className={`text-[18px] dark:text-black`} key={index}>
                                    <Link href={item.url} className="flex items-center">
                                        <item.icon className="mr-2" size="20" />
                                        {item.title}
                                    </Link>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col border-t-2 border-solid py-4">
                        <div className="grid grid-rows-3 gap-2 mt-2">
                            <span className="font-bold text-[20px] dark:text-black ">기타</span>
                            {MenuData2.map((item, index) => (
                                <span className={`text-[18px]  dark:text-black`} key={index}>
                                    <Link href={item.url} className="flex items-center">
                                        <item.icon className="mr-2" size="20" />
                                        {item.title}
                                    </Link>
                                </span>
                            ))}
                            <span onClick={logout} className={`text-[18px]  dark:text-black flex items-center`}>
                                <MdLogout className="mr-2" size="20" />
                                <span>로그아웃</span>
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
