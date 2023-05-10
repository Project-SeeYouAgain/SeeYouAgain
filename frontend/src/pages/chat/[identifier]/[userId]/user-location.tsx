import React, { useState, useEffect } from 'react';
import ResponsiveChecker from '@/components/ResponsiveChecker';
import KakaoMap from '@/components/Location/KakaoMap';
import findMap from '@/images/findmap.gif';
import Image from 'next/image';
import styles from '../userLocation.module.scss';
import { axAuth } from '@/apis/axiosinstance';
import axios, { AxiosInstance } from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from 'recoil/user/atoms';
import { useRouter } from 'next/router';

const UserLocation: React.FC = () => {
    const router = useRouter();
    const [identifier, userId] = router.query || [];
    const [isMobile, setIsMobile] = useState<boolean | null>(null);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const token = useRecoilValue(userState).accessToken;

    const handleIsMobileChanged = (mobile: boolean) => {
        setIsMobile(mobile);
    };
    const [myCheck, setMyCheck] = useState(true);
    const clickPosition = () => {
        myCheck ? setMyCheck(false) : setMyCheck(true);
    };
    useEffect(() => {
        const getLocation = () => {
            axAuth(token)({
                method: 'get',
                url: `/user-service/auth/location/${userId}`,
            })
                .then((res: any) => {
                    console.log(res);
                }) // 잘 들어갔는지 확인
                .catch((err: any) => console.log(err)); // 어떤 오류인지 확인)
            let watchId: number | null = null;

            if (navigator.geolocation) {
                const options = {
                    maximumAge: 0,
                };

                watchId = navigator.geolocation.watchPosition(
                    position => {
                        setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
                        if (position) {
                            const data = { lat: position.coords.latitude, lng: position.coords.longitude };
                            axAuth(token)({
                                method: 'post',
                                url: '/user-service/auth/location',
                                data: data,
                            })
                                .then((res: any) => {
                                    console.log(res);
                                }) // 잘 들어갔는지 확인
                                .catch((err: any) => console.log(err)); // 어떤 오류인지 확인)
                        }
                    },
                    error => {
                        console.error('Error getting position:', error);
                    },
                    options,
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }

            return () => {
                if (watchId !== null) {
                    navigator.geolocation.clearWatch(watchId);
                }
            };
        };

        getLocation();
        const intervalId = setInterval(getLocation, 10000); // 10 seconds

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const message = '이 페이지는 모바일 기기에서 최적화되어 있습니다. 모바일로 접속해주세요.';

    const [dots, setDots] = useState('');
    const check = true;
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (dots.length < 3) {
                setDots(prevDots => prevDots + '.');
            } else {
                setDots('');
            }
        }, 500);
        return () => clearInterval(intervalId);
    }, [dots]);

    return (
        <div className="w-full h-screen">
            <ResponsiveChecker message={message} onIsMobileChanged={handleIsMobileChanged} />
            {isMobile && (
                <>
                    {/* 나머지 페이지 내용 */}
                    {userLocation && (
                        <div>
                            <p className="p-4 pt-8 text-2xl text-center font-bold text-blue">실시간 위치</p>
                            <div className="flex justify-center pb-4">
                                <div className="pr-4">
                                    <div className="w-8 h-8 rounded-full bg-black m-auto" />
                                    <p className="font-bold">이웃닉넴</p>
                                </div>
                                {check && <div className="w-1/2 rounded-full bg-gray-400 text-white p-0.5 text-center h-8"> 준비중이예요. </div>}
                                {!check && <div className="w-1/2 rounded-full bg-blue text-white p-0.5 text-center h-8"> 출발 했어요. </div>}
                            </div>
                        </div>
                    )}
                    <div id="map" className="w-full h-[83%] relative">
                        {userLocation && <KakaoMap lat={userLocation.lat} lng={userLocation.lng} userLocation={userLocation} otherUserLocation={{ lat: 35.2604, lng: 126.6657 }} />}
                        {!userLocation && (
                            <div className="w-full h-screen text-center font-bold text-xl bg-[#183942] text-white">
                                <p className={styles.Container}>위치 권한을 확인해보세요.</p>
                                <Image src={findMap} alt="findmap" className="m-auto" />
                                <p>{`위치를 가져오는 중입니다${dots}`}</p>
                                <p>{userLocation}</p>
                            </div>
                        )}
                        {userLocation && (
                            <div className="absolute bottom-10 w-full z-10" onClick={clickPosition}>
                                {myCheck && <p className="w-2/3 h-12 rounded-xl text-center text-white text-xl m-auto bg-blue pt-2.5">출발할까요?</p>}
                                {!myCheck && <p className="w-2/3 h-12 rounded-xl text-center text-white text-xl m-auto bg-gray-400 pt-2.5">이동중입니다</p>}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default UserLocation;
