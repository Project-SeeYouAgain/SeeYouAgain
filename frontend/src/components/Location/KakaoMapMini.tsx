// KakaoMap.tsx
import React, { useEffect, useState } from 'react';

interface KakaoMapProps {
    lat: number;
    lng: number;
}

declare const kakao: any;

const KakaoMap: React.FC<KakaoMapProps> = ({ lat, lng }) => {
    const [map, setMap] = useState<any>(null);
    useEffect(() => {
        const container = document.getElementById('map');
        if (container) {
            const options = {
                center: new kakao.maps.LatLng(lat, lng),
                zoomControl: true,
                draggable: false,
                scrollwheel: false,
                keyboardShortcuts: false,
                disableDoubleClick: true,
                disableDoubleClickZoom: true,
                level: 3,
            };
            const map = new kakao.maps.Map(container, options);
            setMap(map);
        }
    }, [lat, lng]);

    useEffect(() => {
        const marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(lat, lng),
        });

        marker.setMap(map);
    });

    return <div className="rounded-[1.5rem]" id="map" style={{ width: '100%', height: '100%' }} />;
};

export default KakaoMap;
