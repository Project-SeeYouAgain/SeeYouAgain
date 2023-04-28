// KakaoMap.tsx
import React, { useEffect } from 'react';
import styles from './KakaoMap.module.scss';

interface KakaoMapProps {
    lat: number;
    lng: number;
    level: number;
    userLocation?: { lat: number; lng: number };
    otherUserLocation?: { lat: number; lng: number }; // 다른 사람의 위치를 나타내는 prop 추가
}

declare const kakao: any;

const KakaoMap: React.FC<KakaoMapProps> = ({ lat, lng, level, userLocation, otherUserLocation }) => {
    const content =
        '<div style="color:white; display: flex; align-items: center; justify-content:center; background-color:blue; font-size:large; border-radius:100%; font-weight:bold; width:2.5rem; height:2.5rem;">' +
        '<p>나</p>' +
        '</div>';

    const otherContent =
        '<div style="color:white; display: flex; align-items: center; justify-content:center; background-color:red; font-size:large; border-radius:100%; font-weight:bold; width:2.5rem; height:2.5rem;"><p>이웃</p></div>';

    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(lat, lng),
            level: level,
        };
        const map = new kakao.maps.Map(container, options);

        if (userLocation) {
            const marker = new kakao.maps.CustomOverlay({
                position: new kakao.maps.LatLng(userLocation.lat, userLocation.lng),
                content: content,
            });
            marker.setMap(map);
        }
        if (otherUserLocation) {
            const otherMarker = new kakao.maps.CustomOverlay({
                position: new kakao.maps.LatLng(otherUserLocation.lat, otherUserLocation.lng),
                content: otherContent,
            });
            otherMarker.setMap(map);
        }
        if (userLocation && otherUserLocation) {
            const bounds = new kakao.maps.LatLngBounds();
            bounds.extend(new kakao.maps.LatLng(userLocation.lat, userLocation.lng));
            bounds.extend(new kakao.maps.LatLng(otherUserLocation.lat, otherUserLocation.lng));
            map.setBounds(bounds);
        }
    }, [lat, lng, level, userLocation, otherUserLocation]);

    return <div id="map" style={{ width: '100%', height: '100%' }} />;
};

export default KakaoMap;
