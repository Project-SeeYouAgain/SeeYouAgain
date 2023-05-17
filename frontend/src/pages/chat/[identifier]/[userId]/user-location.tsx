import React, { useState, useEffect } from 'react';
import ResponsiveChecker from '@/components/ResponsiveChecker';
import KakaoMapForChat from '@/components/Location/KakaoMapForChat';
import findMap from '@/images/findmap.gif';
import Image from 'next/image';
import styles from '../userLocation.module.scss';
import { axAuth } from '@/apis/axiosinstance';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user/atoms';
import { useRouter } from 'next/router';
import Navbar from './../../../../components/Container/components/Navbar/index';

const UserLocation: React.FC = () => {
    const router = useRouter();
    const [userNickName, setUserNickName] = useState<string | null>('이웃닉넴');
    const [userId, setUserId] = useState<any>('');
    const [isMobile, setIsMobile] = useState<boolean | null>(null);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [otherUserLocation, setOtherUserLocation] = useState<{ lat: number; lng: number; moving: boolean } | null>(null);
    const token = useRecoilValue(userState).accessToken;
    const myId = useRecoilValue(userState).id;
    const [reservationLocation, setReservationLocation] = useState<{ lat: number; lng: number } | null>(null);

    useEffect(() => {
        console.log(router.query.userId);
        setUserId(router.query.userId);
        updateLocation();
        // 상대방의 프로필 데이터 받아오기
        axAuth(token)({
            method: 'get',
            url: `/user-service/auth/profile/${router.query.userId}`,
        })
            .then(res => {
                console.log('다른 사람 프로필', res.data.data);
                setUserNickName(res.data.data.nickname);
            })
            .catch(err => console.log(err));

        // 상대방의 기본 위치 값을 받아옴
        axAuth(token)({
            method: 'get',
            url: `/user-service/auth/location/${router.query.userId}`,
        })
            .then(res => {
                console.log('다른 사람 프로필', res.data.data);
                if (res.data.data.moving === true) {
                    setOtherUserLocation({ lat: res.data.data.lat, lng: res.data.data.lng, moving: res.data.data.moving });
                }
            })
            .catch(err => {
                setOtherUserLocation(null);
            });
        // 저장해둔 예약 장소 받아오기
        const reserveLocation = localStorage.getItem('reservation-location');
        if (reserveLocation) {
            const reservationData = JSON.parse(reserveLocation);
            setReservationLocation(reservationData);
        }
    }, []);

    const handleIsMobileChanged = (mobile: boolean) => {
        setIsMobile(mobile);
    };
    const [myCheck, setMyCheck] = useState(false);
    // 클릭 시 mycheck를 true로 바꿔
    const clickPosition = () => {
        setMyCheck(!myCheck);
        updateLocation();
    };

    useEffect(() => {
        myId;
    });

    const updateLocation = () => {
        console.log('업데이트 로케이션');
        //만약 다른 사람이 출발을 누르면, 다른 사람의 위치 받아와
        axAuth(token)({
            method: 'get',
            url: `/user-service/auth/location/${router.query.userId}`,
        })
            .then(res => {
                console.log('다른 사람 위치', res.data.data);
                if (res.data.data.moving == true) {
                    setOtherUserLocation({ lat: res.data.data.lat, lng: res.data.data.lng, moving: res.data.data.moving });
                }
            })
            .catch(err => console.log(err));

        if (router.query.userId) {
            // 내 위치가 변화한 것을 감지하면 watchId가 실행
            const watchId = navigator.geolocation.getCurrentPosition(
                position => {
                    // 바뀌면 userLocation에 해당 lat, lng 저장
                    setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
                    if (position) {
                        console.log('position if 부분');
                        const data = { lat: position.coords.latitude, lng: position.coords.longitude, moving: myCheck };
                        console.log('내 위치 보내기');
                        axAuth(token)({
                            method: 'post',
                            url: '/user-service/auth/location',
                            data: data,
                        })
                            .then(res => {
                                console.log('성공', res);
                            })

                            .catch(err => {
                                console.log(err);
                            });
                    }
                },
                error => {
                    console.error('Error getting position:', error);
                },
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    useEffect(() => {
        if (!router.isReady) return;
        console.log('연속 시작');
        if (myCheck) {
            const intervalId = setInterval(updateLocation, 5000); // 10 second
            return () => {
                clearInterval(intervalId);

                // 페이지를 벗어날 때 실행되는 cleanup 함수
                (async () => {
                    if (userLocation) {
                        const data = {
                            lat: null,
                            lng: null,
                            moving: false, // 원하는 값으로 설정
                        };

                        try {
                            await axAuth(token)({
                                method: 'delete',
                                url: `/user-service/auth/location/${myId}`,
                            });
                        } catch (err) {
                            console.log(err);
                        }
                    }
                })();
            };
        }
    }, [myCheck]);

    const message = '이 페이지는 모바일 기기에서 최적화되어 있습니다. 모바일로 접속해주세요.';

    const [dots, setDots] = useState('');
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
        <div className="flex flex-col h-screen">
            <ResponsiveChecker message={message} onIsMobileChanged={handleIsMobileChanged} />
            {isMobile && (
                <>
                    {!userLocation && (
                        <div className="w-full h-screen text-center font-bold text-xl bg-[#183942] text-white">
                            <p className={styles.Container}>위치 권한을 확인해보세요.</p>
                            <Image src={findMap} alt="findmap" className="m-auto" />
                            <p>{`위치를 가져오는 중입니다${dots}`}</p>
                        </div>
                    )}
                    {userLocation && (
                        <div>
                            <p className="p-4 pt-8 text-2xl text-center font-bold text-blue">실시간 위치</p>
                            <div className="flex justify-center pb-4">
                                <div className="pr-4 text-center w-fit">
                                    <div className="w-8 h-8 rounded-full bg-black m-auto" />
                                    <p className="font-bold">{userNickName}</p>
                                </div>
                                {!otherUserLocation?.moving && <div className="w-1/2 rounded-full bg-gray-400 text-white p-0.5 text-center h-8"> 준비중이예요. </div>}
                                {otherUserLocation?.moving && <div className="w-1/2 rounded-full bg-blue text-white p-0.5 text-center h-8"> 출발 했어요. </div>}
                            </div>
                        </div>
                    )}
                    <div id="map" className="w-full flex-grow relative">
                        {userLocation && (
                            <KakaoMapForChat
                                lat={userLocation.lat}
                                lng={userLocation.lng}
                                userLocation={userLocation}
                                otherUserLocation={otherUserLocation}
                                reservationLocation={reservationLocation}
                            />
                        )}
                    </div>
                    {userLocation && (
                        <div className="absolute bottom-20 right-5 w-1/3 z-10" onClick={clickPosition}>
                            {!myCheck && <p className="w-full h-12 rounded-xl text-center text-white text-xl bg-blue pt-2.5">출발</p>}
                            {myCheck && <p className="w-full h-12 rounded-xl text-center text-white text-xl bg-gray-400 pt-2.5">이동중</p>}
                        </div>
                    )}
                    {userLocation && <Navbar />}
                </>
            )}
        </div>
    );
};

export default UserLocation;
