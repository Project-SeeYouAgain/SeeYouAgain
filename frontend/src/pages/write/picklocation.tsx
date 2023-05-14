import React, { useState, useEffect } from 'react';
import ResponsiveChecker from '@/components/ResponsiveChecker';
import KakaoMap from '@/components/Location/SetKakaoMap';
import pin from '@/images/location-pin.png';
import Image from 'next/image';
import styles from './userLocation.module.scss';

const pickLocation = ({
    setData,
    setIsLocationOn,
    data,
    onSubmit,
}: {
    setData: React.Dispatch<React.SetStateAction<StepTwoData>>;
    setIsLocationOn: React.Dispatch<React.SetStateAction<boolean>>;
    data: StepTwoData;
    onSubmit: (data: StepTwoData) => void;
}) => {
    if (typeof window === 'undefined' || typeof kakao === 'undefined') {
        return <div>Loading...</div>; // 서버 사이드 렌더링 시에 표시할 컴포넌트 또는 메시지를 반환합니다.
    }

    const [isMobile, setIsMobile] = useState<boolean | null>(null);
    // 좌표-주소 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();
    const userLocation = { lat: 35.1548, lng: 126.8792 };

    const [lng, setLng] = useState<number>(0);
    const [lat, setLat] = useState<number>(0);

    const handleIsMobileChanged = (mobile: boolean) => {
        setIsMobile(mobile);
    };

    const [myCheck, setMyCheck] = useState(true);

    const clickPosition = () => {
        myCheck ? setMyCheck(false) : setMyCheck(true);
        // 좌표로 행정동 주소 정보를 요청합니다
        geocoder.coord2RegionCode(lng, lat, (result: any, status: any) => {
            // console.log('이거슨 리절트여: ', result);
            // console.log('이거슨 스테이터스여: ', status);
            if (status == 'OK') {
                const locationData = { lng, lat, RegionCode: result[0].region_3depth_name };
                setData(prevData => ({ ...prevData, location: locationData }));
                setIsLocationOn(false);
            }
        });
    };

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
        <div className="w-[100vw] h-[100vh]">
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
                    <div id="map" className="w-full h-[76vh] relative">
                        <KakaoMap
                            onCenterChanged={(lat, lng) => {
                                setLat(lat);
                                setLng(lng);
                            }}
                        />
                        <div className="absolute bottom-10 w-[100%] px-[1.88rem] z-10" onClick={clickPosition}>
                            {myCheck && <p className=" h-12 rounded-xl text-center text-white font-semibold text-xl m-auto bg-blue pt-2.5">장소 확정</p>}
                            {!myCheck && <p className="  h-12 rounded-xl text-center text-white text-xl font-semibold  m-auto bg-gray-400 pt-2.5">확정 완료</p>}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default pickLocation;
