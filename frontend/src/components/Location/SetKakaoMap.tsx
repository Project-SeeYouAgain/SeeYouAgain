import React, { useEffect, useState } from 'react';
import styles from './SetKakaoMap.module.scss';
import Image from 'next/image';
import pin from '@/images/pin.png';
import { axAuth } from '@/apis/axiosinstance';

interface KakaoMapProps {
    lat: number;
    lng: number;
    onCenterChanged: (lat: number, lng: number) => void;
}
interface Zone {
    lat: number;
    lng: number;
    radius: number;
}

// 카카오 객체 전역으로 설정
declare global {
    interface Window {
        kakao: any;
    }
    const kakao: any;
}

// 격자 크기 및 범위 설정 (값은 적절하게 조절 가능)
const gridSize = 0.002; // 격자 크기를 늘립니다.
const range = 0.02;

// 겹치는 영역을 처리하는 함수
const handleCircleOverlap = (safetyZones: any[], lat: number, lng: number) => {
    const grid = [];

    for (let y = lat - range; y <= lat + range; y += gridSize) {
        for (let x = lng - range; x <= lng + range; x += gridSize) {
            const point = { lat: y, lng: x, score: 0 };

            safetyZones.forEach((zone: { type: string; locations: { lat: number; lng: number }[] }) => {
                zone.locations.forEach((location: { lat: number; lng: number }) => {
                    const distance = Math.sqrt(Math.pow(point.lat - location.lat, 2) + Math.pow(point.lng - location.lng, 2));
                    const radius = zone.type === 'police' ? 100 : 50; // 경찰서의 반경은 100m, 나머지는 50m로 설정

                    if (distance <= radius) {
                        point.score += 1;
                    }
                });
            });

            if (point.score > 0) {
                grid.push(point);
            }
        }
    }

    return grid;
};

const KakaoMap: React.FC<KakaoMapProps> = ({ lat, lng, onCenterChanged }) => {
    const [map, setMap] = useState<any>(null);
    const [timeoutId, setTimeoutId] = useState<any>(null);
    const [check, setCheck] = useState<any>(0);
    const [prevCenter, setPrevCenter] = useState<{ lat: number; lng: number } | null>(null);
    const [location, setLocation] = useState<any>(null);
    const [marker, setMarker] = useState<any>(null);
    const [myCheck, setMyCheck] = useState(true);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [safetyZones, setSafetyZones] = useState<any[]>([]);
    const [list, setList] = useState<string[]>([]);

    const clickPosition = () => {
        myCheck ? setMyCheck(false) : setMyCheck(true);
    };
    const geocoder = new kakao.maps.services.Geocoder();

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
    }, [lat, lng]);

    useEffect(() => {
        if (map && marker) {
            const center = new kakao.maps.LatLng(lat, lng);
            map.setCenter(center);
            marker.setPosition(center);
        }
    }, [lat, lng, map, marker]);

    useEffect(() => {
        const handleDragEnd = () => {
            const center = map.getCenter();
            const newLat = center.getLat();
            const newLng = center.getLng();

            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            setTimeoutId(
                setTimeout(() => {
                    if ((!prevCenter || prevCenter.lat !== newLat || prevCenter.lng !== newLng) && userLocation && userLocation.lat !== newLat && userLocation.lng !== newLng) {
                        onCenterChanged(newLat, newLng);
                        setPrevCenter({ lat: newLat, lng: newLng });
                        geocoder.coord2RegionCode(newLng, newLat, (result: any, status: any) => {
                            // console.log('이거슨 리절트여: ', result);
                            // console.log('이거슨 스테이터스여: ', status);
                            if (status == 'OK') {
                                setLocation(result[0].region_3depth_name);
                                console.log(location);
                                const newList = [...list, result[0].region_3depth_name];
                                setList(newList);
                                // ...
                                if (location != result[0].region_3depth_name && !list.includes(result[0].region_3depth_name)) {
                                    console.log('추가');
                                    const data = { location: result[0].region_3depth_name };
                                    const newSafetyZones: any[] = [];

                                    // 경찰서 위치 정보 가져오기
                                    axAuth
                                        .get(`/product-service/auth/safe/police/${result[0].region_3depth_name}`)
                                        .then(res => {
                                            console.log(res);
                                            const response = res.data.data;
                                            newSafetyZones.push({ type: 'police', locations: response });
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        });

                                    // 가로등 위치 정보 가져오기
                                    axAuth
                                        .get(`/product-service/auth/safe/light/${result[0].region_3depth_name}`)
                                        .then(res => {
                                            console.log(res);
                                            const response = res.data.data;
                                            newSafetyZones.push({ type: 'light', locations: response });
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        });

                                    // CCTV 위치 정보 가져오기
                                    axAuth
                                        .get(`/product-service/auth/safe/cctv/${result[0].region_3depth_name}`)
                                        .then(res => {
                                            console.log(res);
                                            const response = res.data.data;
                                            newSafetyZones.push({ type: 'cctv', locations: response });

                                            // 상태 업데이트
                                            setSafetyZones(newSafetyZones);
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        });
                                }
                                // ...
                            }
                        });
                    }
                }, 1000),
            );
        };

        if (map) {
            kakao.maps.event.addListener(map, 'dragend', handleDragEnd);
        }

        return () => {
            if (map) {
                kakao.maps.event.removeListener(map, 'dragend', handleDragEnd);
            }
        };
    }, [map, onCenterChanged]);
    useEffect(() => {
        if (map && safetyZones.length > 0) {
            console.log(safetyZones);

            const overlappedGrid = handleCircleOverlap(safetyZones, lat, lng);
            console.log('overlapped', overlappedGrid);
            overlappedGrid.forEach(point => {
                // const color = point.score > 1 ? '#FF0000' : '#FFFF00';
                // const rectangle = new kakao.maps.Rectangle({
                //     bounds: new kakao.maps.LatLngBounds(
                //         new kakao.maps.LatLng(point.lat - gridSize / 2, point.lng - gridSize / 2),
                //         new kakao.maps.LatLng(point.lat + gridSize / 2, point.lng + gridSize / 2),
                //     ),
                //     fillColor: '#7F7F7F', // 색상을 회색으로 변경합니다.
                //     fillOpacity: 0.1, // 투명도를 더 낮춥니다.
                //     strokeWeight: 1, // 테두리 두께를 설정합니다.
                //     strokeColor: '#7F7F7F', // 테두리 색상을 회색으로 변경합니다.
                //     strokeOpacity: 0.5, // 테두리 투명도를 설정합니다.
                // });

                // rectangle.setMap(map);
                console.log('점수 : ', point);
                if (point.score >= 1) {
                    console.log('점수 : ', point.score);
                    const text = new kakao.maps.CustomOverlay({
                        position: new kakao.maps.LatLng(point.lat, point.lng),
                        content: `<div style="font-size: 12px; font-weight: bold; color: #FF0000;">${point.score}</div>`,
                        zIndex: 10,
                    });

                    text.setMap(map);
                }
            });

            safetyZones.map(zone => {
                zone.locations.map((location: { lat: number; lng: number; address: string }) => {
                    const circle = new kakao.maps.Circle({
                        center: new kakao.maps.LatLng(location.lat, location.lng),
                        radius: 100, // 반경 100m
                        strokeWeight: 0,
                        strokeColor: '#3399ff',
                        strokeOpacity: 0.8,
                        fillColor: '#3399ff',
                        fillOpacity: 0.2, // 투명도를 낮추어 원이 덜 가려지게 합니다.
                    });

                    circle.setMap(map);
                });
            });
        }
    }, [map, safetyZones]);

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
