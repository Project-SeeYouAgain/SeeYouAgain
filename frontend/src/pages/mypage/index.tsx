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
import WebNavbar from '@/components/Container/components/WebNavbar';
import Cart from './cart';
import Rent from './rent';
import Myitem from './myitem';
import Setting from './settings';
import classNames from 'classnames';

function MyPage() {
    interface profile {
        profileImg: string;
        nickname: string;
        location: string;
        description: string;
        mannerScore: number;
    }
    const cookie = new Cookies();
    const router = useRouter();
    const allCookies = cookie.getAll();
    const [selectedMenu, setSelectedMenu] = useState('찜 목록');
    const renderContent = () => {
        switch (selectedMenu) {
            case '찜 목록':
                return <Cart />;
            case '대여 받은 내역':
                return <Rent />;
            case '내 아이템 관리':
                return <Myitem />;
            case '프로필 수정':
                return <Setting />;

            default:
                return <Cart />;
        }
    };

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
        if (token === undefined) {
            router.push('/');
        }
        const url = `/user-service/auth/profile`;
        axBase(token)({ url })
            .then(res => {
                console.log(res.data.data);
                setProfileData(res.data.data);
            })
            .catch(err => console.log(err));
    }, []);
    const [webContainerWidth, setWebContainerWidth] = useState<number>(0);
    const [webContainerHeight, setWebContainerHeight] = useState<number>(0);
    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            const containerWidth = windowWidth - 300;
            setWebContainerWidth(containerWidth);
            const windowHeight = window.innerHeight;
            const containerHeight = windowHeight - 100;
            setWebContainerHeight(containerHeight);
        };

        // 초기 로드 및 윈도우 크기 변경 이벤트에 대한 이벤트 핸들러 등록
        handleResize();
        window.addEventListener('resize', handleResize);

        // 컴포넌트 언마운트 시 이벤트 핸들러 제거
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const desktopQuery = window.matchMedia('(min-width:767px)');
        const mobileQuery = window.matchMedia('(max-width:767px)');

        const handleDesktopQuery = (event: MediaQueryListEvent) => {
            setIsDesktop(event.matches);
        };

        const handleMobileQuery = (event: MediaQueryListEvent) => {
            setIsMobile(event.matches);
        };

        desktopQuery.addEventListener('change', handleDesktopQuery);
        mobileQuery.addEventListener('change', handleMobileQuery);

        // 초기값 설정
        setIsDesktop(desktopQuery.matches);
        setIsMobile(mobileQuery.matches);

        return () => {
            desktopQuery.removeEventListener('change', handleDesktopQuery);
            mobileQuery.removeEventListener('change', handleMobileQuery);
        };
    }, []);

    // 로딩 중이거나 초기 상태일 때 출력할 내용
    if (isDesktop === null || isMobile === null) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            {isDesktop && (
                <>
                    <WebNavbar />
                    <div className="p-6 mt-[100px] w-[300px] absolute left-0" style={{ height: webContainerHeight }}>
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
                                    <span className={classNames(`text-[18px] cursor-pointer`, selectedMenu == item.title ? 'text-blue' : 'text-black')} key={index}>
                                        <div className="flex items-center" onClick={() => setSelectedMenu(item.title)}>
                                            <item.icon className="mr-2" size="20" />
                                            {item.title}
                                        </div>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col border-t-2 border-solid py-4">
                            <div className="grid grid-rows-3 gap-2 mt-2">
                                <span className="font-bold text-[20px] dark:text-black ">기타</span>
                                {MenuData2.map((item, index) => (
                                    <span className={classNames(`text-[18px] cursor-pointer`, selectedMenu == item.title ? 'text-blue' : 'text-black')} key={index}>
                                        <div className="flex items-center" onClick={() => setSelectedMenu(item.title)}>
                                            <item.icon className="mr-2" size="20" />
                                            {item.title}
                                        </div>
                                    </span>
                                ))}
                                <span onClick={logout} className={`text-[18px]  dark:text-black flex items-center cursor-pointer`}>
                                    <MdLogout className="mr-2" size="20" />
                                    <span>로그아웃</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute mt-[100px] right-0">
                        <div className="p-4" style={{ width: webContainerWidth, height: webContainerHeight }}>
                            {renderContent()}
                        </div>
                    </div>
                </>
            )}
            {isMobile && (
                <>
                    <div className="relative">
                        <span className="absolute mt-8 left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] font-bold text-[20px] text-[#5669FF]">마이페이지</span>
                    </div>
                    <Body className="pt-[46px]">
                        {profileData ? (
                            <Profile
                                profileImg={profileData.profileImg}
                                nickname={profileData.nickname}
                                location={profileData.location}
                                description={profileData.description}
                                mannerScore={profileData.mannerScore}
                            />
                        ) : null}
                        <div className="flex flex-col py-4">
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
                    <Navbar />
                </>
            )}
        </Container>
    );
}

export default MyPage;
