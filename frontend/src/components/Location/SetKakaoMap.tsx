import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import pin from '@/images/pin.png';

interface KakaoMapProps {
    lat: number;
    lng: number;
    onCenterChanged?: (lat: number, lng:number) => void 
}

interface SafetyGrid {
    lat: number;
    lng: number;
    score: number;
}

const KakaoMap: React.FC<KakaoMapProps> = ({ lat, lng }, onCenterChanged) => {
    const [map, setMap] = useState<any>(null);
    const [myCheck, setMyCheck] = useState(true);
    const [visibleRectangles, setVisibleRectangles] = useState<kakao.maps.Rectangle[]>([]);
    const [visitedAreas, setVisitedAreas] = useState<string[]>([]);

    useEffect(() => {
        const container = document.getElementById('map');
        if (!container) return;

        const options = {
            center: new kakao.maps.LatLng(lat, lng),
            level: 3,
            minLevel: 3,
            maxLevel: 4,
        };
        const newMap = new kakao.maps.Map(container, options);
        setMap(newMap);
    }, [lat, lng]);

    const safetyScoreToColor = (score: number) => {
        if (score >= 18) {
            return '#008000'; // dark green
        } else if (score >= 16) {
            return '#00b300'; // dark green
        } else if (score >= 14) {
            return '#00e600'; // green
        } else if (score >= 12) {
            return '#00ff00'; // lime green
        } else if (score >= 10) {
            return '#33ff33'; // neon green
        } else if (score >= 8) {
            return '#66ff66'; // light green
        } else if (score >= 6) {
            return '#99ff99'; // pale green
        } else if (score >= 4) {
            return '#ccffcc'; // very pale green
        } else {
            return 'transparent'; // transparent
        }
    };

    const clickPosition = () => {
        setMyCheck(!myCheck);
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
                    console.log(lat_index, lng_index);
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

    useEffect(() => {
        drawVisibleSafetyRectangles();
    }, [map]);

    useEffect(() => {
        const handleBoundsChanged = () => {
            drawVisibleSafetyRectangles();
        };
        const handleDragEnd = () => {
            drawVisibleSafetyRectangles();
        };
        if (map) {
            kakao.maps.event.addListener(map, 'dragstart', () => {
                kakao.maps.event.removeListener(map, 'bounds_changed', handleBoundsChanged);
            });
            kakao.maps.event.addListener(map, 'dragend', () => {
                drawVisibleSafetyRectangles();
                kakao.maps.event.addListener(map, 'bounds_changed', handleBoundsChanged);
                const center = map.getCenter();
                const newLat = center.getLat();
                const newLng = center.getLng();
                if (onCenterChanged) {
                    onCenterChanged(newLat, newLng);
                }
            });
            kakao.maps.event.addListener(map, 'bounds_changed', handleBoundsChanged);
        }

        return () => {
            if (map) {
                kakao.maps.event.removeListener(map, 'dragstart', handleBoundsChanged);
                kakao.maps.event.removeListener(map, 'dragend', handleBoundsChanged);
                kakao.maps.event.removeListener(map, 'bounds_changed', handleBoundsChanged);
            }
        };
    }, [map]);
    return (
        <div id="map" style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Image src={pin} alt="pins" className="absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 z-10" />
            <div className="absolute bottom-10 w-full z-10" onClick={clickPosition}>
                {myCheck && <p className="w-2/3 h-12 rounded-xl text-center text-white text-xl m-auto bg-blue pt-2.5">출발할까요?</p>}
                {!myCheck && <p className="w-2/3 h-12 rounded-xl text-center text-white text-xl m-auto bg-gray-400 pt-2.5">이동중입니다</p>}
            </div>
        </div>
    );
};

export default KakaoMap;
