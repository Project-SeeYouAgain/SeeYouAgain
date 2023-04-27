import React, { useState } from 'react';
import ResponsiveChecker from '@/components/ResponsiveChecker';
import KakaoMap from '@/components/KakaoMap';

const UserLocation: React.FC = () => {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    const handleIsMobileChanged = (mobile: boolean) => {
        setIsMobile(mobile);
    };
    const message = '이 페이지는 모바일 기기에서 최적화되어 있습니다. 모바일로 접속해주세요.';

    return (
        <div className="w-full h-screen">
            <ResponsiveChecker message={message} onIsMobileChanged={handleIsMobileChanged} />
            {isMobile && (
                <>
                    {/* 나머지 페이지 내용 */}
                    <p className="p-4 pt-8 text-2xl text-center font-bold text-blue">실시간 위치</p>
                    <div className="flex justify-center pb-4">
                        <div className="pr-4">
                            <div className="w-8 h-8 rounded-full bg-black m-auto" />
                            <p className="font-bold">이웃닉넴</p>
                        </div>
                        <div className="w-1/2 rounded-full bg-black text-white p-0.5 text-center h-8"> 준비중이예요. </div>
                    </div>
                    <div id="map" className="w-full h-[83%] relative">
                        <KakaoMap lat={37.566826} lng={126.9786567} level={3} />
                        <div className="absolute bottom-10 w-full z-10">
                            <p className="w-2/3 h-12 rounded-xl text-center text-white text-xl m-auto bg-blue pt-2.5 ">지금 출발해요</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserLocation;
