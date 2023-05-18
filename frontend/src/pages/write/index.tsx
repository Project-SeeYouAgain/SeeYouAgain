import React, { useEffect, useState } from 'react';

import StepOneForm from './components/StepOneForm';
import StepTwoForm from './components/StepTwoFrom';
import WebWrite from './components/WebWrite';
import { useMediaQuery } from 'react-responsive';
import Modal from './components/Modal';

import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useRouter } from 'next/router';
import { axAuth } from '@/apis/axiosinstance';

import axios, { AxiosInstance } from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from 'recoil/user/atoms';
import Navbar from '@/components/Container/components/Navbar';
import Image from 'next/image';
import spinner from '@/images/circle-loader.gif';

function Write() {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [stepOneData, setStepOneData] = useState<StepOneData | null>(null);
    const [stepTwoData, setStepTwoData] = useState<StepTwoData | null>(null);
    const token = useRecoilValue(userState).accessToken;
    const [loading, setLoading] = useState(false); // 추가: 로딩 상태

    const router = useRouter();

    useEffect(() => {
        // 클라이언트에서만 실행되는 부작용
        // ...
        const reload = localStorage.getItem('reload');
        if (!reload) {
            localStorage.setItem('reload', 'true');
            router.reload();
        }
        return () => {
            localStorage.removeItem('reload');
        };
    }, []);

    const handleStepOneSubmit = (data: StepOneData) => {
        setStepOneData(prevData => ({ ...prevData, ...data }));
    };

    const handleStepTwoSubmit = (data: StepTwoData) => {
        setStepTwoData(prevData => ({ ...prevData, ...data }));
    };
    // 날짜 변환 함수
    function formatDate(dateStr: any) {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }

    // 이전 단계로 이동
    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };
    // 제출
    const handleSubmit = () => {
        if (!stepOneData || !stepTwoData) return;

        setLoading(true);

        const data = {
            ...stepOneData,
            ...stepTwoData,
        };

        // stepTwoData의 데이터가 기본값인지 아닌지 확인
        console.log('세이프존', data.isSafe);
        const hasEnteredData = Object.values(stepTwoData);
        // 데이터가 모두 입력되지 않은 경우 제출을 막음
        if (
            hasEnteredData[0].length === 0 || // 상품 이미지
            hasEnteredData[1] === '' || // 제목
            hasEnteredData[2] === '' || // 카테고리
            hasEnteredData[3] === 0 || // 가격
            hasEnteredData[4] === '' || // 설명
            hasEnteredData[5] === null || // 날짜
            hasEnteredData[7].lat === 0 || // 거래장소
            hasEnteredData[7].lng === 0 ||
            hasEnteredData[7].RegionCode === ''
        ) {
            if (hasEnteredData[0].length === 0) {
                setIsModalOpen(true);
                setModalMessage('상품 이미지');
            }
            if (hasEnteredData[1] === '') {
                setIsModalOpen(true);
                setModalMessage('제목 데이터');
            }
            if (hasEnteredData[2] === '') {
                setIsModalOpen(true);
                setModalMessage('카테고리');
            }
            if (hasEnteredData[3] === 0) {
                setIsModalOpen(true);
                setModalMessage('가격 데이터');
            }
            if (hasEnteredData[4] === '') {
                setIsModalOpen(true);
                setModalMessage('설명 데이터');
            }
            if (hasEnteredData[5] === null) {
                setIsModalOpen(true);
                setModalMessage('일정 데이터');
            }
            if (hasEnteredData[7].lat === 0) {
                setIsModalOpen(true);
                setModalMessage('거래장소');
            }

            // alert('필수 데이터를 모두 입력해주세요!');
            return;
        }

        // 데이터가 모두 입력되었으면 제출 가능
        const submitData = {
            title: data.title,
            type: data.type,
            category: data.category,
            price: data.price,
            description: data.description,
            lat: data.location.lat,
            lng: data.location.lng,
            regionCode: data.location.RegionCode,
            tag: data.tag,
            startDate: formatDate(data.startDate),
            endDate: formatDate(data.endDate),
            isSafe: data.isSafe,
        };
        // 폼데이터 생성
        const formData = new FormData();
        // 사진 넣기
        if (data.productImg) {
            for (let i = 0; i < data.productImg.length; i++) {
                formData.append('productImg', data.productImg[i]);
            }
        }

        // requestDto object를 json으로 변환한 후 blob객체에 담기
        const blob = new Blob([JSON.stringify(submitData)], {
            // type에 JSON 타입 지정
            type: 'application/json',
        });

        // 폼데이터에 넣기

        formData.append('requestDto', blob);

        console.log('폼데이터 입니다.', formData);
        console.log('제출 데이터 입니다.', submitData);
        console.log('난 그냥 데이터', data);
        try {
            axAuth(token)({
                method: 'post',
                url: '/product-service/auth',
                headers: { 'Content-Type': 'multipart/form-data' },
                data: formData,
            })
                .then(res => {
                    alert('게시글이 등록되었습니다!');
                    router.push('/home');
                }) // 잘 들어갔는지 확인
                .catch(err => console.log(err)); // 어떤 오류인지 확인)
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
    // 미디어쿼리
    const isDesktop: boolean = useMediaQuery({
        query: '(min-width:1024px)',
    });
    const isMobile: boolean = useMediaQuery({
        query: '(max-width:767px)',
    });
    const [view, setView] = useState<boolean>(false);
    // 이부분은 필요해서 놔뒀습니다.
    useEffect(() => {
        if (token === undefined || token === null) {
            console.log('로그인 풀림');
            router.push('/');
        }
        setView(true);
    }, []);

    // 모달
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>('');
    return (
        <div>
            {isDesktop && (
                <div>
                    <WebWrite handleSubmit={handleSubmit} />
                </div>
            )}
            {isMobile && view && (
                <div>
                    {currentStep === 1 && <StepOneForm onSubmit={handleStepOneSubmit} />}
                    {currentStep === 2 && <StepTwoForm onSubmit={handleStepTwoSubmit} />}
                    {currentStep === 3 && <p>Thank you for your submission!</p>}
                    {currentStep !== 3 && (
                        <>
                            {currentStep == 1 && (
                                <>
                                    <button className="absolute bottom-2 right-8 text-white text-[2rem] bg-blue w-[3.2rem] h-[3rem] rounded-[.4rem]" onClick={() => setCurrentStep(currentStep + 1)}>
                                        <MdKeyboardArrowRight className="m-auto" />
                                    </button>
                                    <Navbar />
                                </>
                            )}
                            {currentStep == 2 && (
                                <div>
                                    {loading ? (
                                        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[rgba(0,0,0,0.2)] z-30">
                                            <div className=" absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                                                <Image src={spinner} alt="spinner" className="w-10 h-10" />
                                            </div>
                                            <p className="absolute top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-NanumNeo text-center text-base bg-black py-1 px-3 rounded-full">
                                                글을 등록하고 있어요.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="fixed bottom-0 w-full flex py-4 z-30 bg-white">
                                            <div className="flex m-auto">
                                                <button className=" text-white text-[2rem] bg-[#d2d2d2] w-[3.2rem] h-[3rem] rounded-l-[.4rem]" onClick={handlePrevious}>
                                                    <MdKeyboardArrowLeft className="m-auto" />
                                                </button>

                                                <button onClick={handleSubmit} className="text-white text-[1rem] bg-blue w-[70vw] h-[3rem] rounded-r-[.4rem]">
                                                    등록하기
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                    <Modal isModalOpen={isModalOpen} message={modalMessage} onClose={() => setIsModalOpen(false)} />
                </div>
            )}
        </div>
    );
}

export default Write;
