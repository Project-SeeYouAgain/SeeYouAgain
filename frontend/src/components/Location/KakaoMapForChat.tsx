// KakaoMap.tsx
import React, { useEffect, useState } from 'react';
import styles from './KakaoMap.module.scss';

interface KakaoMapProps {
    lat: number;
    lng: number;
    userLocation: { lat: number; lng: number } | null;
    otherUserLocation: { lat: number; lng: number } | null;
    reservationLocation: { lat: number; lng: number } | null;
}

declare const kakao: any;

const KakaoMap: React.FC<KakaoMapProps> = ({ lat, lng, userLocation, otherUserLocation, reservationLocation }) => {
    const [map, setMap] = useState<any>(null);
    const [markers, setMarkers] = useState<any[]>([]);
    // const [reservationLocation, setReservationLocation] = useState<reservationLocation>();
    const content =
        '<div style="color:white; display: flex; align-items: center; justify-content:center; background-color:blue; font-family:NanumNeo; font-size:large; border-radius:100%; font-weight:bold; width:2.5rem; height:2.5rem;">' +
        '<p>나</p>' +
        '</div>';

    const otherContent =
        '<div style="color:white; display: flex; align-items: center; justify-content:center; background-color:red; font-family:NanumNeo; font-size:large; border-radius:100%; font-weight:bold; width:2.5rem; height:2.5rem;"><p>이웃</p></div>';

    const reservationContent =
        '<div style="color:white; display: flex; align-items: center; justify-content:center; background-color:black; font-family:NanumNeo; font-size:large; border-radius:100%; font-weight:bold; width:2.5rem; height:2.5rem;"><p>거래</p></div>';

    useEffect(() => {
        const container = document.getElementById('map');

        const options = {
            center: new kakao.maps.LatLng(lat, lng),
            zoomControl: false,
            draggable: false,
            scrollwheel: false,
            keyboardShortcuts: false,
            disableDoubleClick: true,
            disableDoubleClickZoom: true,
        };

        const newMap = new kakao.maps.Map(container, options);
        setMap(newMap);
    }, [lat, lng]);

    useEffect(() => {
        if (map) {
            markers.forEach(marker => marker.setMap(null));
            setMarkers([]);
            const newMarkers = [];

            if (reservationLocation) {
                const reservationMarker = new kakao.maps.CustomOverlay({
                    position: new kakao.maps.LatLng(reservationLocation.lat, reservationLocation.lng),
                    content: reservationContent,
                });
                reservationMarker.setMap(map);
                newMarkers.push(reservationMarker);
            }

            if (userLocation) {
                const userMarker = new kakao.maps.CustomOverlay({
                    position: new kakao.maps.LatLng(userLocation.lat, userLocation.lng),
                    content: content,
                });
                userMarker.setMap(map);
                newMarkers.push(userMarker);
            }

            if (otherUserLocation) {
                const otherMarker = new kakao.maps.CustomOverlay({
                    position: new kakao.maps.LatLng(otherUserLocation.lat, otherUserLocation.lng),
                    content: otherContent,
                });
                otherMarker.setMap(map);
                newMarkers.push(otherMarker);
            }

            setMarkers(newMarkers);

            const bounds = new kakao.maps.LatLngBounds();
            if (reservationLocation) {
                bounds.extend(new kakao.maps.LatLng(reservationLocation.lat, reservationLocation.lng));
            }
            if (userLocation) {
                bounds.extend(new kakao.maps.LatLng(userLocation.lat, userLocation.lng));
            }
            if (otherUserLocation) {
                bounds.extend(new kakao.maps.LatLng(otherUserLocation.lat, otherUserLocation.lng));
            }
            map.setBounds(bounds);
        }
    }, [map, userLocation, otherUserLocation]);

    return <div id="map" style={{ width: '100%', height: '100%' }} />;
};

export default KakaoMap;
