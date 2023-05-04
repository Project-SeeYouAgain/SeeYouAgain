import Container from '@/components/Container';
import CloseHeader from '@/components/Container/components/CloseHeader';
import React, { useState } from 'react';
import Body from '@/components/Container/components/Body';
import DatePicker from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import { format } from 'date-fns';
import Image from 'next/image';
import location from '@/assets/icons/3Dloca.png';
import SquareLg from '@/components/Button/SquareLg';

function book() {
    const close = () => {
        console.log('dd');
    };
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

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
                        <div className="grid grid-cols-4 text-center">
                            <p className="text-blue font-bold">시작일</p>
                            <p>{format(startDate, 'yyyy.MM.dd', { locale: ko })}</p>
                            <p className="text-blue font-bold">종료일</p>
                            <p>{format(endDate, 'yyyy.MM.dd', { locale: ko })}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-4 text-blue font-bold text-center">
                            <p>시작일</p>
                            <span></span>
                            <p>종료일</p>
                            <span></span>
                        </div>
                    )}
                </div>
                <div>
                    <p className="font-bold text-xl"> 거래장소 </p>
                    <div className="p-4 mt-4 w-full h-20 rounded-2xl border border-solid border-[#aeaeae] flex justify-between content-center items-center">
                        <p className="font-bold text-darkgrey "> 거래장소 선택하러 가기 </p>
                        <Image src={location} alt="location" className="w-16 h-16" />
                    </div>
                </div>
            </Body>
            <button className="absolute bottom-0 w-full h-16 bg-blue text-white text-xl font-bold">예약확정</button>
        </Container>
    );
}

export default book;
