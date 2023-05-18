// KakaoMap.tsx
import React, { useEffect, useState } from 'react';
import { TbCookieMan, TbBrandQq } from 'react-icons/tb';
import { BsBox2HeartFill } from 'react-icons/bs';
import { GrLocationPin } from 'react-icons/gr';
import ReactDOMServer from 'react-dom/server';
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

    const iconHtml = ReactDOMServer.renderToString(<TbCookieMan size={40} />);
    const content = `
    <div style="color:blue; align-items:center; justify-content:center; font-size:large; border-radius:100%; font-weight:bold;">
    <p style="font-family:NanumNeoLt;text-align:center; margin:auto; background-color:blue; border-radius:20px;color:white;font-size:0.8rem;width:2.5rem;">나<p/>
      ${iconHtml}
    </div>
    `;

    const otherContent = `
      <div style="color:red; align-items:center; justify-content:center; font-size:large; border-radius:100%; font-weight:bolder;">
      <p style="font-family:NanumNeoLt;text-align:center; margin:auto; background-color:red; border-radius:20px;color:white;font-size:0.8rem;width:2.5rem;">이웃<p/>
        ${iconHtml}
      </div>
    `;

    const reserIconHtml = ReactDOMServer.renderToString(<BsBox2HeartFill size={30} className="m-auto" />);
    const reservationContent = `
      <div style="color:black; align-items:center; justify-content:center; font-size:large; border-radius:100%; font-weight:bolder;">
      <p style="font-family:NanumNeoLt;text-align:center; margin:auto; background-color:black; border-radius:20px;color:white;font-size:0.8rem;width:2.5rem;margin-bottom:0.2rem">거래<p/>
        ${reserIconHtml}
      </div>
    `;

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
            const reservationMarker = new kakao.maps.CustomOverlay({
                position: new kakao.maps.LatLng(reservationLocation.lat, reservationLocation.lng),
                content: reservationContent,
            });
            reservationMarker.setMap(map);
            newMarkers.push(reservationMarker);
            markers.forEach(marker => marker.setMap(null));

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
