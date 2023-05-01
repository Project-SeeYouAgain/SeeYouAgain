import React, { useEffect, useState } from 'react';
import styles from './SetKakaoMap.module.scss';
import Image from 'next/image';
import pin from '@/images/pin.png';

interface KakaoMapProps {
    lat: number;
    lng: number;
    onCenterChanged: (lat: number, lng: number) => void;
}

declare const kakao: any;

const KakaoMap: React.FC<KakaoMapProps> = ({ lat, lng, onCenterChanged }) => {
    const [map, setMap] = useState<any>(null);
    const [marker, setMarker] = useState<any>(null);
    const [myCheck, setMyCheck] = useState(true);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const clickPosition = () => {
        myCheck ? setMyCheck(false) : setMyCheck(true);
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
                    if (userLocation) {
                        const marker = new kakao.maps.CustomOverlay({
                            position: new kakao.maps.LatLng(userLocation.lat, userLocation.lng),
                        });
                        marker.setMap(map);
                    }
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

    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(lat, lng),
        };
        const newMap = new kakao.maps.Map(container, options);
        setMap(newMap);
    }, []);

    useEffect(() => {
        if (map && marker) {
            const center = new kakao.maps.LatLng(lat, lng);
            map.setCenter(center);
            marker.setPosition(center);
        }
    }, [lat, lng, map, marker]);

    useEffect(() => {
        if (map) {
            kakao.maps.event.addListener(map, 'dragend', () => {
                const center = map.getCenter();
                const newLat = center.getLat();
                const newLng = center.getLng();
                onCenterChanged(newLat, newLng);
            });
        }
    }, [map, onCenterChanged]);

    return (
        <div id="map" style={{ width: '100%', height: '100%' }}>
            <Image src={pin} alt="pins" className="absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 z-10" />
            <div className="absolute bottom-10 w-full z-10" onClick={clickPosition}>
                {myCheck && <p className="w-2/3 h-12 rounded-xl text-center text-white text-xl m-auto bg-blue pt-2.5">출발할까요?</p>}
                {!myCheck && <p className="w-2/3 h-12 rounded-xl text-center text-white text-xl m-auto bg-gray-400 pt-2.5">이동중입니다</p>}
            </div>
        </div>
    );
};

export default KakaoMap;
