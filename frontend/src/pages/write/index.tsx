import Navbar from '@/components/Container/components/Navbar';
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Button from '@/components/Button';
import { useRouter } from 'next/router';
import Image from 'next/image';
import SquareLg from '@/components/Button/SquareLg';
import calender from '@/assets/icons/3Dcal.png';

import ImageUpload from '@/components/ImageUpload';
import Container from '@/components/Container';
import Body from '@/components/Container/components/Body';
import CloseHeader from '@/components/Container/components/CloseHeader';
import TextInput from './components/textinput';
import Category from './components/Category';
import TagInput from './components/TagInput';

import location from '@/assets/icons/3Dloca.png';
import want from '../../../public/icon/want.png';

import renter from '../../../public/icon/renter.png';
import Link from 'next/link';

type Props = {
    onSubmit: (data: FormData) => void;
};

type FormData = {};

function Write() {
    const [data, setData] = useState<boolean>(false);
    useEffect(() => {
        setData(true);
    }, []);
    // 미디어쿼리
    const isDesktop: boolean = useMediaQuery({
        query: '(min-width:1024px)',
    });
    const isMobile: boolean = useMediaQuery({
        query: '(max-width:767px)',
    });
    // 페이지 닫기
    const router = useRouter();

    const handleClose = () => {
        // 글 작성을 중단하시겠습니까? alert 하기
        // 이전페이지로 이동하기
        router.back();
    };
    // 글 유형 선택 (빌려줘요: 0 구해요 : 1)
    const [isRenter, setIsRenter] = useState(false);
    function onHandleData() {
        setIsRenter(!isRenter);
    }
    // 체크
    const [check, setCheck] = useState(false);

    // 세이프존
    const [isSafeZone, setIsSafeZone] = useState(false);

    // 글 유형
    const StepOneFrom = ({ onSubmit }: Props) => {
        const [data, setData] = useState<FormData>({});
        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            onSubmit(data);
        };
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <p className="mb-[1.2rem] font-bold text-[1.2rem] "> 글 유형</p>
                </div>
                {isRenter && (
                    <div onClick={onHandleData} className="relative  flex  w-[100%] h-[15rem] rounded-[1rem]  mb-[1rem]" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                        <span className="font-bold text-blue text-[3rem] absolute bottom-1 left-[1.2rem]"> 구해요 </span>
                        <Image src={want} alt="want" className="w-[10rem] absolute right-0"></Image>
                    </div>
                )}
                {!isRenter && (
                    <div className="relative  flex  w-[100%] h-[15rem] rounded-[1rem] bg-blue  mb-[1rem]" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                        <span className="font-bold text-white text-[3rem] absolute bottom-1 left-[1.2rem]"> 구해요 </span>
                        <Image src={want} alt="want" className="w-[10rem] absolute right-0"></Image>
                    </div>
                )}
                {!isRenter && (
                    <div onClick={onHandleData} className="relative  flex  w-[100%] h-[15rem] rounded-[1rem]  mb-[1rem]" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                        <div>
                            <span className="font-bold text-blue text-[3rem] absolute top-2 left-[1.2rem]"> 빌려줘요 </span>
                            <Image src={renter} alt="want" className="w-[12rem] bottom-0 absolute right-0"></Image>
                        </div>
                    </div>
                )}
                {isRenter && (
                    <div className="relative  flex  w-[100%] h-[15rem] bg-blue rounded-[1rem]  mb-[1rem]" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                        <div>
                            <span className="font-bold text-white text-[3rem] absolute top-2 left-[1.2rem]"> 빌려줘요 </span>
                            <Image src={renter} alt="want" className="w-[12rem] bottom-0 absolute right-0"></Image>
                        </div>
                    </div>
                )}
                <button type="submit"> Next </button>
            </form>
        );
    };

    return (
        <div className="bg-white ">
            {isDesktop && <div>데스크탑화면</div>}
            {isMobile && data && (
                <Container>
                    {/* 제목 및 상단 */}
                    <Body>
                        <CloseHeader title="글 작성하기" onClose={handleClose}></CloseHeader>
                        <div> </div>
                        {/* 입력 내용 */}
                        <div className="text-left ">
                            {/* 글유형 */}
                            {/* 이미지 */}
                            <div className="mt-[1rem] ">
                                <p className="mb-[1rem] font-bold text-[1.2rem] "> 상품 이미지</p>
                                <ImageUpload />
                            </div>
                            {/* 제목/설명/일정 */}
                            <div className="mt-[1rem] mb-[-1rem] ">
                                <TextInput />
                            </div>
                            {/* 대여 일정 */}
                            <div className="relative">
                                <p className="font-bold text-[1.2rem] mb-[0.43rem] ">대여일정</p>
                                <div className="m-auto w-[100%] h-[5rem] rounded-[.625rem]" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)', opacity: 0.5 }}></div>
                                <div>
                                    <Image src={calender} alt="camera" className="w-[4rem] absolute top-11 right-[1.5rem]"></Image>
                                    <span className="font-bold absolute top-[55%] left-[8%] text-darkgrey "> 대여일정 선택하러 가기 </span>
                                </div>
                                {/* <DatePicker /> */}
                                {/* <Calendar onDatesChange={handleDatesChange} /> */}
                            </div>
                            {/* 카테고리 */}
                            <div className="mt-[1rem]">
                                <p className="mb-[1.2rem] font-bold text-[1.2rem] "> 카테고리 </p>
                                <Category></Category>
                            </div>
                            {/* 태그 */}
                            <div className="mt-[1rem]">
                                <p className="mb-[1.2rem] font-bold text-[1.2rem] "> 태그 </p>
                                <TagInput />
                            </div>
                            {/* 거래장소 */}
                            <p className="mb-[1.2rem] font-bold text-[1.2rem]"> 거래장소 </p>
                            <div className="relative">
                                <div className="m-auto w-[100%] h-[5rem] rounded-[.625rem]" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)', opacity: 0.5 }}></div>
                                <div>
                                    <Image src={location} alt="camera" className="w-[4rem] absolute top-2 right-[1.5rem]"></Image>
                                    <span className="font-bold absolute top-[40%] left-[8%] text-darkgrey "> 거래장소 선택하러 가기 </span>
                                </div>
                            </div>
                            {/* 세이프존 */}
                            <div className="flex mt-[1rem] mb-[1rem] items-center	 ">
                                <input
                                    className="hidden"
                                    id="isSafeZone"
                                    name="category"
                                    type="radio"
                                    onClick={() => {
                                        setIsSafeZone(!isSafeZone);
                                    }}
                                />
                                <label
                                    htmlFor="isSafeZone"
                                    className={`inline-block cursor-pointer w-[2rem] h-[2rem] rounded-[4rem] text-center font-bold ${
                                        isSafeZone === true ? 'bg-blue text-white' : 'bg-lightgrey text-darkgrey'
                                    }`}
                                ></label>
                                <span className="ml-[.5rem]">
                                    <span className="font-bold text-blue">SAFEZONE</span>
                                    <span className="font-bold text-darkgrey"> 에서 거래 할게요.</span>
                                </span>
                            </div>
                            <div className="mt-4">
                                <SquareLg check={check} innerValue="제출완료" bgColor="blue" textColor="white" />
                            </div>
                            <div className="mt-[5rem]"></div>
                        </div>
                    </Body>
                    <Navbar />
                </Container>
            )}
        </div>
    );
}

export default Write;
