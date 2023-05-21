import React, { useState, useEffect } from 'react';
import Container from '../Container';
import CloseHeader from '../Container/components/CloseHeader';

declare const kakao: any;

function Index() {
    const [map, setMap] = useState<any>(null);
    const lat = 35.2604;
    const lng = 126.6657;

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

    const close = () => {
        console.log('dd');
    };
    const startDate = 'yyyy.MM.dd';
    const endDate = 'yyyy.MM.dd';
    return (
        <Container className="relative pb-24 h-full w-full overflow-y-auto">
            <CloseHeader title="예약정보" onClose={close} />
            <div className="px-[1.88rem]">
                <p className="text-xl font-bold mb-6">대여기간</p>
                <div className="grid grid-cols-2 text-center">
                    <p>
                        <span className="font-bold text-blue mr-2">시작일</span>
                        {startDate}
                    </p>
                    <p>
                        <span className="font-bold text-blue mr-2">종료일</span>
                        {endDate}
                    </p>
                </div>
                <p className="text-xl font-bold my-6">대여기간</p>
                <div id="map" className="w-full h-[70vw]" />
            </div>
            <button className="absolute text-xl bottom-0 w-full rounded-b-xl bg-blue text-white h-16 mt-6">예약확정</button>
        </Container>
    );
}

export default Index;
