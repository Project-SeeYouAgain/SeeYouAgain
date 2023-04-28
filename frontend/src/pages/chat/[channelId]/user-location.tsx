import React, { useState, useEffect } from 'react';
import ResponsiveChecker from '@/components/ResponsiveChecker';
import KakaoMap from '@/components/KakaoMap';
import findMap from '@/images/findmap.gif';
import Image from 'next/image';

const UserLocation: React.FC = () => {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

    const handleIsMobileChanged = (mobile: boolean) => {
        setIsMobile(mobile);
    };

    useEffect(() => {
        let watchId: number | null = null;

        if (navigator.geolocation) {
            const options = {
                enableHighAccuracy: true,
                maximumAge: 0,
            };

            watchId = navigator.geolocation.watchPosition(
                position => {
                    setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
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
    }, []);

    const message = '이 페이지는 모바일 기기에서 최적화되어 있습니다. 모바일로 접속해주세요.';

    const [dots, setDots] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (dots.length < 3) {
                setDots(prevDots => prevDots + '.');
            } else {
                setDots('');
            }
        }, 1000);
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
                                <div className="w-1/2 rounded-full bg-black text-white p-0.5 text-center h-8"> 준비중이예요. </div>
                            </div>
                        </div>
                    )}
                    <div id="map" className="w-full h-[83%] relative">
                        {userLocation && <KakaoMap lat={userLocation.lat} lng={userLocation.lng} level={3} userLocation={userLocation} otherUserLocation={{ lat: 35.1548, lng: 126.8792 }} />}
                        {!userLocation && (
                            <div className="w-full h-screen text-center font-bold text-xl bg-[#183942] text-white">
                                <Image src={findMap} alt="findmap" className="m-auto pt-[50%]" />
                                <p>{`위치를 가져오는 중입니다${dots}`}</p>
                            </div>
                        )}
                        {userLocation && (
                            <div className="absolute bottom-10 w-full z-10">
                                <p className="w-2/3 h-12 rounded-xl text-center text-white text-xl m-auto bg-blue pt-2.5">지금 출발해요</p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default UserLocation;
