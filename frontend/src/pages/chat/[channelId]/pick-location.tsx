import React, { useState, useEffect } from 'react';
import ResponsiveChecker from '@/components/ResponsiveChecker';
import KakaoMap from '@/components/Location/SetKakaoMap';
import pin from '@/images/location-pin.png';
import Image from 'next/image';
import styles from './userLocation.module.scss';

const UserLocation: React.FC = () => {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);
    const userLocation = { lat: 35.1548, lng: 126.8792 };

    const handleIsMobileChanged = (mobile: boolean) => {
        setIsMobile(mobile);
    };
    const [myCheck, setMyCheck] = useState(true);
    const clickPosition = () => {
        myCheck ? setMyCheck(false) : setMyCheck(true);
    };

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
                        <div className="p-4 font-bold">
                            <div className="flex justify-between h-fit text-xl">
                                <div>
                                    <p>이웃과 만나서</p>
                                    <p>거래할 장소를 확인해주세요</p>
                                </div>
                                <div className="h-1/3">
                                    <Image src={pin} alt="pin" />
                                </div>
                            </div>
                            <p className="text-blue">안전한 세이프존에서 거래하는 것을 추천해요.</p>
                        </div>
                    )}
                    <div id="map" className="w-full h-[100%-5rem] relative">
                        <KakaoMap onCenterChanged={(lat, lng) => console.log(lat, lng)} lat={userLocation.lat} lng={userLocation.lng} />
                        <div className="absolute bottom-10 w-full z-10" onClick={clickPosition}>
                            {myCheck && <p className="w-2/3 h-12 rounded-xl text-center text-white text-xl m-auto bg-blue pt-2.5">장소 확정</p>}
                            {!myCheck && <p className="w-2/3 h-12 rounded-xl text-center text-white text-xl m-auto bg-gray-400 pt-2.5">확정 완료</p>}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserLocation;
