import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import pin from '@/images/pin.png';
import { useRouter } from 'next/router';
import { BiCurrentLocation } from 'react-icons/bi';

interface KakaoMapProps {
    click: boolean;
    onCenterChanged?: (lat: number, lng: number) => void;
    onCenter?: (lat: number, lng: number, score: number) => void;
}

interface SafetyGrid {
    lat: number;
    lng: number;
    score: number;
}

const KakaoMap: React.FC<KakaoMapProps> = ({ onCenterChanged, onCenter, click = true }) => {
    const [map, setMap] = useState<any>(null);
    const [visibleRectangles, setVisibleRectangles] = useState<kakao.maps.Rectangle[]>([]);
    const [visitedAreas, setVisitedAreas] = useState<string[]>([]);
    const [data, setData] = useState<Array<{ lat: number; lng: number; score: number }> | []>([]);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const router = useRouter();
    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                const options = {
                    maximumAge: 0,
                };
                navigator.geolocation.getCurrentPosition(
                    position => {
                        setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
                    },
                    error => {
                        console.error('Error getting position:', error);
                    },
                    options,
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        if (userLocation === null) {
            getLocation();
        } else {
            const container = document.getElementById('map');
            if (!container) return;

            const options = {
                center: new kakao.maps.LatLng(userLocation.lat, userLocation.lng),
                level: 2,
                minLevel: 2,
                maxLevel: 3,
            };
            const newMap = new kakao.maps.Map(container, options);
            setMap(newMap);
        }
    }, [userLocation]);

    const safetyScoreToColor = (score: number) => {
        if (score >= 7.5) {
            return '#008000'; // dark green
        } else if (score >= 5) {
            return '#00e600'; // green
        } else if (score >= 2.5) {
            return '#66ff66'; // light green
        } else {
            return 'transparent'; // transparent
        }
    };

    const createSafetyRectangle = (lat: number, lng: number, color: string) => {
        const gridInterval = 0.0005;
        const rectangleOptions: kakao.maps.RectangleOptions = {
            bounds: new kakao.maps.LatLngBounds(new kakao.maps.LatLng(lat - gridInterval / 2, lng - gridInterval / 2), new kakao.maps.LatLng(lat + gridInterval / 2, lng + gridInterval / 2)),
            strokeWeight: 0,
            fillColor: color,
            fillOpacity: 0.7,
        };
        const rectangle = new kakao.maps.Rectangle(rectangleOptions);
        rectangle.setMap(map);

        setVisibleRectangles(prevVisibleRectangles => [...prevVisibleRectangles, rectangle]);
    };

    const getVisibleSafetyData = async (bounds: kakao.maps.LatLngBounds) => {
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();

        const min_lat = 35.09;
        const max_lat = 35.25;
        const min_lng = 126.66;
        const max_lng = 126.99;

        const lat_splits = 72;
        const lng_splits = 145;
        const lat_step = (max_lat - min_lat) / lat_splits;
        const lng_step = (max_lng - min_lng) / lng_splits;

        const lat_index_start = Math.floor((sw.getLat() - min_lat) / lat_step) + 1;
        const lng_index_start = Math.floor((sw.getLng() - min_lng) / lng_step) + 1;
        const lat_index_end = Math.floor((ne.getLat() - min_lat) / lat_step) + 1;
        const lng_index_end = Math.floor((ne.getLng() - min_lng) / lng_step) + 1;

        const visibleSafetyData: SafetyGrid[] = [];

        for (let lat_index = lat_index_start; lat_index <= lat_index_end; lat_index++) {
            for (let lng_index = lng_index_start; lng_index <= lng_index_end; lng_index++) {
                const id = `${lat_index},${lng_index}`;
                if (visitedAreas.includes(id)) continue; // 이미 방문한 곳이면 반복문 다음으로 넘어감
                setVisitedAreas(prevVisitedAreas => [...prevVisitedAreas, id]); // 방문한 곳으로 추가

                try {
                    const response = await fetch(`/output/grid_scores_${lat_index}_${lng_index}.json`);
                    const data = await response.json();
                    visibleSafetyData.push(...data);
                } catch (error) {
                    console.error('Failed to load JSON file:', error);
                }
            }
        }

        return visibleSafetyData;
    };

    const drawVisibleSafetyRectangles = async () => {
        if (!map) return;

        const bounds = map.getBounds();

        // 이전에 만들어진 사각형들 삭제
        setVisibleRectangles(prevVisibleRectangles => {
            prevVisibleRectangles.forEach(rectangle => {
                rectangle.setMap(null);
            });
            return [];
        });

        const visibleSafetyData = await getVisibleSafetyData(bounds);

        if (visibleSafetyData.length === 0) return;

        visibleSafetyData.forEach(grid => {
            const id = `${grid.lat},${grid.lng}`;
            if (visitedAreas.includes(id)) return; // 이미 방문한 곳이면 함수 종료
            setVisitedAreas([...visitedAreas, id]); // 방문한 곳으로 추가

            const color = safetyScoreToColor(grid.score);
            createSafetyRectangle(grid.lat, grid.lng, color);
        });
    };

    const getCenterSafetyScore = async (center: kakao.maps.LatLng) => {
        const min_lat = 35.09;
        const max_lat = 35.25;
        const min_lng = 126.66;
        const max_lng = 126.99;

        const lat_splits = 72;
        const lng_splits = 145;
        const lat_step = (max_lat - min_lat) / lat_splits;
        const lng_step = (max_lng - min_lng) / lng_splits;

        const lat_index = Math.floor((center.getLat() - min_lat) / lat_step) + 1;
        const lng_index = Math.floor((center.getLng() - min_lng) / lng_step) + 1;

        try {
            const response = await fetch(`/output/grid_scores_${lat_index}_${lng_index}.json`);
            const data = await response.json();

            // center가 포함되어 있는 사각형의 점수를 찾음
            const rectangle = data.find((item: SafetyGrid) => {
                const latDiff = Math.abs(center.getLat() - item.lat);
                const lngDiff = Math.abs(center.getLng() - item.lng);
                const gridInterval = 0.0005; // 사각형의 한 변 길이

                return latDiff < gridInterval / 2 && lngDiff < gridInterval / 2;
            });

            if (rectangle) {
                return rectangle.score;
            }
        } catch (error) {
            console.error('Failed to load JSON file:', error);
        }

        // 데이터를 찾을 수 없을 경우 기본값인 0을 반환
        return 0;
    };

    useEffect(() => {
        drawVisibleSafetyRectangles();
    }, [map]);

    useEffect(() => {
        const handleBoundsChanged = () => {
            drawVisibleSafetyRectangles();
        };
        const handleDragEnd = async () => {
            drawVisibleSafetyRectangles();
            kakao.maps.event.addListener(map, 'bounds_changed', handleBoundsChanged);
            const center = map.getCenter();
            const newLat = center.getLat();
            const newLng = center.getLng();

            if (onCenterChanged) {
                onCenterChanged(newLat, newLng);
            }
            const centerScore = await getCenterSafetyScore(center);
            if (onCenter) {
                onCenter(newLat, newLng, centerScore);
            }

            // do something with the data
        };
        if (map) {
            kakao.maps.event.addListener(map, 'dragstart', () => {
                kakao.maps.event.removeListener(map, 'bounds_changed', handleBoundsChanged);
            });
            kakao.maps.event.addListener(map, 'dragend', handleDragEnd);
            kakao.maps.event.addListener(map, 'bounds_changed', handleBoundsChanged);
        }

        return () => {
            if (map) {
                kakao.maps.event.removeListener(map, 'dragstart', handleBoundsChanged);
                kakao.maps.event.removeListener(map, 'dragend', handleDragEnd);
                kakao.maps.event.removeListener(map, 'bounds_changed', handleBoundsChanged);
            }
        };
    }, [map, onCenterChanged]);
    const reload = () => {
        router.reload();
    };
    const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const desktopQuery = window.matchMedia('(min-width:767px)');
        const mobileQuery = window.matchMedia('(max-width:767px)');

        const handleDesktopQuery = (event: MediaQueryListEvent) => {
            setIsDesktop(event.matches);
        };

        const handleMobileQuery = (event: MediaQueryListEvent) => {
            setIsMobile(event.matches);
        };

        desktopQuery.addEventListener('change', handleDesktopQuery);
        mobileQuery.addEventListener('change', handleMobileQuery);

        // 초기값 설정
        setIsDesktop(desktopQuery.matches);
        setIsMobile(mobileQuery.matches);

        return () => {
            desktopQuery.removeEventListener('change', handleDesktopQuery);
            mobileQuery.removeEventListener('change', handleMobileQuery);
        };
    }, []);

    // 로딩 중이거나 초기 상태일 때 출력할 내용
    if (isDesktop === null || isMobile === null) {
        return <div>Loading...</div>;
    }

    return (
        <div id="map" style={{ width: '100%', height: '100%', position: 'relative' }}>
            {isMobile && (
                <div className=" absolute top-4 right-4 z-10 text-center px-3 py-2 text-[.9rem] bg-white/80 font-bold rounded">
                    <p className="px-1">안전지수</p>
                    <div className="flex text-xs">
                        <div className="w-1/2 bg-[#66ff66] mr-1"></div>
                        <span className="whitespace-nowrap w-1/2">1단계</span>
                    </div>
                    <div className="flex text-xs">
                        <div className="w-1/2 bg-[#00e600] mr-1"></div>
                        <span className="whitespace-nowrap w-1/2">2단계</span>
                    </div>
                    <div className="flex text-xs">
                        <div className="w-1/2 bg-[#008000] mr-1"></div>
                        <span className="whitespace-nowrap w-1/2">3단계</span>
                    </div>
                </div>
            )}
            {isDesktop && (
                <div className=" absolute bottom-[5vh] right-[5vh] z-10 text-center px-5 py-4 text-2xl bg-white/80 font-bold rounded">
                    <p className="pb-1">안전지수</p>
                    <div className="flex text-xl">
                        <div className="w-1/2 bg-[#66ff66] mr-1"></div>
                        <span className="whitespace-nowrap w-1/2">1단계</span>
                    </div>
                    <div className="flex text-xl">
                        <div className="w-1/2 bg-[#00e600] mr-1"></div>
                        <span className="whitespace-nowrap w-1/2">2단계</span>
                    </div>
                    <div className="flex text-xl">
                        <div className="w-1/2 bg-[#008000] mr-1"></div>
                        <span className="whitespace-nowrap w-1/2">3단계</span>
                    </div>
                </div>
            )}
            {click && (
                <button className="rounded-full absolute bottom-[15vh] right-[10vw] z-10 h-[6vh] w-[6vh] bg-white drop-shadow-lg ">
                    <BiCurrentLocation className="w-full h-full p-1" onClick={reload} />
                </button>
            )}
            <Image src={pin} alt="pins" className="absolute w-[4rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full z-10" />
        </div>
    );
};

export default KakaoMap;
