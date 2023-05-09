import Container from '@/components/Container';
import CloseHeader from '@/components/Container/components/CloseHeader';
import React, { useEffect, useState } from 'react';
import Body from '@/components/Container/components/Body';
import DatePicker from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import { format } from 'date-fns';
import Image from 'next/image';
import location from '@/assets/icons/3Dloca.png';
import { useRouter } from 'next/router';
import { axAuth } from '@/apis/axiosinstance';
import Swal from 'sweetalert2';

function formatDate(date: any) {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

function book() {
    const close = () => {
        console.log('dd');
    };

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    useEffect(() => {
        if (startDate && endDate) {
            localStorage.setItem('date', JSON.stringify({ startDate: startDate, endDate: endDate }));
        }
    }, [startDate, endDate]);
    const router = useRouter();
    const { identifier } = router.query;
    const goTo = () => {
        router.push(`/chat/${identifier}/pick-location`);
    };
    const [lat, setLat] = useState<string | null>(null);
    const [lng, setLng] = useState<string | null>(null);
    const [dong, setDong] = useState<string | null>(null);
    useEffect(() => {
        const geocoder = new kakao.maps.services.Geocoder();
        const location = localStorage.getItem('location');
        if (location) {
            const locationData = JSON.parse(location);
            setLat(locationData.lat);
            setLng(locationData.lng);
            geocoder.coord2RegionCode(locationData.lng, locationData.lat, (result: any, status: any) => {
                if (status == 'OK') {
                    setDong(result[0].region_3depth_name);
                }
            });
        }
        const date = localStorage.getItem('date');
        if (date) {
            const useDate = JSON.parse(date);
            setStartDate(new Date(useDate.startDate));
            setEndDate(new Date(useDate.endDate));
        }
    }, []);
    const reservation = () => {
        const data = {
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
            lng: lng,
            lat: lat,
            location: dong,
        };
        axAuth({
            method: 'post',
            url: `/product-service/auth/reservation/request/${identifier}`,
            data: data,
        })
            .then((res: any) => {
                Swal.fire({
                    title: '예약 성공',
                    text: '성공했습니다.',
                    icon: 'success', // 성공, 에러, 경고 등의 아이콘을 선택할 수 있습니다.
                    confirmButtonText: '확인', // 버튼 텍스트를 지정할 수 있습니다.
                    confirmButtonColor: '#3085d6',
                }).then(result => {
                    if (result.isConfirmed) {
                        localStorage.removeItem('location');
                        localStorage.removeItem('date');
                        router.push(`/chat/${identifier}`);
                    } else if (result.isDenied) {
                        // 취소 버튼 클릭 시 처리할 로직
                    }
                });
                setTimeout(() => {
                    Swal.clickConfirm();
                }, 3000);
            }) // 잘 들어갔는지 확인
            .catch((err: any) => console.log(err)); // 어떤 오류인지 확인)
    };

    return (
        <Container className="relative">
            <CloseHeader title="예약하기" onClose={close} />
            <Body>
                <p className="my-4 font-bold text-xl">대여기간</p>
                <DatePicker
                    locale={ko}
                    inline={true}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    onChange={update => {
                        setStartDate(update[0]);
                        setEndDate(update[1]);
                    }}
                />
                <div className="mb-4 px-2">
                    {startDate && endDate ? (
                        <div className="grid grid-cols-2 text-left">
                            <div className="text-blue font-bold flex">
                                <span className="whitespace-nowrap">시작일</span> <span className="text-black font-bold w-full text-center">{format(startDate, 'yy.MM.dd', { locale: ko })}</span>
                            </div>
                            <div className="text-blue font-bold flex">
                                <span className="whitespace-nowrap">종료일</span> <span className="text-black font-bold w-full text-center">{format(endDate, 'yy.MM.dd', { locale: ko })}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 text-blue font-bold text-left">
                            <p>시작일</p>
                            <p>종료일</p>
                        </div>
                    )}
                </div>
                <div>
                    <p className="font-bold text-xl"> 거래장소 </p>
                    <div className="p-4 mt-4 w-full h-20 rounded-2xl border border-solid border-[#aeaeae] flex justify-between content-center items-center" onClick={goTo}>
                        <p className="font-bold text-darkgrey "> 거래장소 선택하러 가기 </p>
                        <Image src={location} alt="location" className="w-16 h-16" />
                    </div>
                </div>
            </Body>
            <button className="absolute bottom-0 w-full h-16 bg-blue text-white text-xl font-bold" onClick={reservation}>
                예약확정
            </button>
        </Container>
    );
}

export default book;
