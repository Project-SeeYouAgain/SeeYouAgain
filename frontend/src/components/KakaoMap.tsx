// components/KakaoMap.tsx
import React, { useEffect, useRef } from 'react';

interface KakaoMapProps {
    lat: number;
    lng: number;
    level: number;
}

const KakaoMap: React.FC<KakaoMapProps> = ({ lat, lng, level }) => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof (window as any).kakao !== 'undefined' && (window as any).kakao.maps) {
            const container = mapRef.current; // 지도를 표시할 div
            const options = {
                center: new (window as any).kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
                level: level, // 지도의 확대 레벨
            };

            // 지도를 생성합니다
            const map = new (window as any).kakao.maps.Map(container, options);
        }
    }, []);

    return <div ref={mapRef} className="w-full h-full"></div>;
};

export default KakaoMap;
