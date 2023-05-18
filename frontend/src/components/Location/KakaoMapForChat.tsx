// KakaoMap.tsx
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user/atoms';
import './kakaoMap.css';

interface KakaoMapProps {
    lat: number;
    lng: number;
    userLocation: { lat: number; lng: number } | null;
    otherUserLocation: { lat: number | null; lng: number | null; moving: boolean; profile: string | null } | null;
    reservationLocation: { lat: number; lng: number } | null;
}

declare const kakao: any;

const KakaoMap: React.FC<KakaoMapProps> = ({ lat, lng, userLocation, otherUserLocation, reservationLocation }) => {
    const [map, setMap] = useState<any>(null);
    const [markers, setMarkers] = useState<any[]>([]);
    const profileImg = useRecoilValue(userState).profileImg;
    const defaultImage = 'https://seeyouagain-s3-bucket.s3.ap-northeast-2.amazonaws.com/UserProfile/default_user.png';
    const deal = 'https://seeyouagain-s3-bucket.s3.ap-northeast-2.amazonaws.com/UserProfile/money-bag.png';

    // 이미지 마커에 사용될 이미지 URL을 여기에 넣으세요.

    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(reservationLocation?.lat, reservationLocation?.lng),
            zoomControl: false,
            draggable: false,
            scrollwheel: false,
            keyboardShortcuts: false,
            disableDoubleClick: true,
            disableDoubleClickZoom: true,
        };

        const newMap = new kakao.maps.Map(container, options);
        setMap(newMap);
    }, [reservationLocation]);

    useEffect(() => {
        if (map && reservationLocation) {
            const newMarkers = [];
            setMarkers([]);

            const reservationMarkerImage = new kakao.maps.MarkerImage(deal, new kakao.maps.Size(35, 35));

            const reservationMarker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(reservationLocation.lat, reservationLocation.lng),
                image: reservationMarkerImage,
            });

            reservationMarker.setMap(map);
            newMarkers.push(reservationMarker);
            markers.forEach(marker => marker.setMap(null));

            if (userLocation) {
                if (profileImg) {
                    const markerImage = new kakao.maps.MarkerImage(profileImg, new kakao.maps.Size(35, 35));

                    const userMarker = new kakao.maps.Marker({
                        position: new kakao.maps.LatLng(userLocation.lat, userLocation.lng),
                        image: markerImage,
                    });

                    userMarker.setMap(map);
                    newMarkers.push(userMarker);
                } else {
                    const markerImage = new kakao.maps.MarkerImage(defaultImage, new kakao.maps.Size(35, 35));

                    const userMarker = new kakao.maps.Marker({
                        position: new kakao.maps.LatLng(userLocation.lat, userLocation.lng),
                        image: markerImage,
                    });

                    userMarker.setMap(map);
                    newMarkers.push(userMarker);
                }
                const content = '<div class ="label"><span class="left"></span><span class="center">나</span><span class="right"></span></div>';

                // 커스텀 오버레이가 표시될 위치입니다
                const position = new kakao.maps.LatLng(userLocation.lat, userLocation.lng);

                // 커스텀 오버레이를 생성합니다
                const customOverlay = new kakao.maps.CustomOverlay({
                    position: position,
                    content: content,
                });
                customOverlay.setMap(map);
            }

            if (otherUserLocation) {
                if (otherUserLocation.profile) {
                    const otherMarkerImage = new kakao.maps.MarkerImage(otherUserLocation.profile, new kakao.maps.Size(35, 35));

                    const otherMarker = new kakao.maps.Marker({
                        position: new kakao.maps.LatLng(otherUserLocation.lat, otherUserLocation.lng),
                        image: otherMarkerImage,
                    });

                    otherMarker.setMap(map);
                    newMarkers.push(otherMarker);
                } else {
                    const otherMarkerImage = new kakao.maps.MarkerImage(defaultImage, new kakao.maps.Size(35, 35));

                    const otherMarker = new kakao.maps.Marker({
                        position: new kakao.maps.LatLng(otherUserLocation.lat, otherUserLocation.lng),
                        image: otherMarkerImage,
                    });

                    otherMarker.setMap(map);
                    newMarkers.push(otherMarker);
                }
                const content = '<div class ="label"><span class="left"></span><span class="center">이웃</span><span class="right"></span></div>';

                // 커스텀 오버레이가 표시될 위치입니다
                const position = new kakao.maps.LatLng(otherUserLocation.lat, otherUserLocation.lng);

                // 커스텀 오버레이를 생성합니다
                const customOverlay = new kakao.maps.CustomOverlay({
                    position: position,
                    content: content,
                });
                customOverlay.setMap(map);
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
