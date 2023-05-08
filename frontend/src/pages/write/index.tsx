import React, { useEffect, useState } from 'react';

import StepOneForm from './components/StepOneForm';
import StepTwoForm from './components/StepTwoFrom';
import { useMediaQuery } from 'react-responsive';
import Modal from './components/Modal';

import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useRouter } from 'next/router';
import { axAuth } from '@/apis/axiosinstance';

function Write() {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [stepOneData, setStepOneData] = useState<StepOneData | null>(null);
    const [stepTwoData, setStepTwoData] = useState<StepTwoData | null>(null);

    const router = useRouter();

    const handleStepOneSubmit = (data: StepOneData) => {
        setStepOneData(data);
    };

    const handleStepTwoSubmit = (data: StepTwoData) => {
        setStepTwoData(data);
    };

    // 이전 단계로 이동
    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };
    // 제출
    const handleSubmit = () => {
        if (!stepOneData || !stepTwoData) return;

        const data = {
            ...stepOneData,
            ...stepTwoData,
        };

        console.log('Data submitted:', data); // 데이터 콘솔 출력

        // stepTwoData의 데이터가 기본값인지 아닌지 확인
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
                setModalMessage('거래 장소');
            }
            // alert('필수 데이터를 모두 입력해주세요!');
            return;
        }

        // 데이터가 모두 입력되었으면 제출 가능

        // 폼데이터 생성
        const formData = new FormData();

        // 사진 넣기
        if (data.productImg) {
            for (let i = 0; i < data.productImg.length; i++) {
                formData.append('productImg', data.productImg[i]);
            }
        }

        // 사진 삭제
        delete data.productImg;
        // console.log(data); // 사진이 잘 지워졌는지 확인

        // requestDto object를 json으로 변환한 후 blob객체에 담기
        const blob = new Blob([JSON.stringify(data)], {
            // type에 JSON 타입 지정
            type: 'application/json',
        });

        // 폼데이터에 넣기
        formData.append('requestDto', blob);
        axAuth({
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
        setView(true);
    }, []);

    // 모달
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>('');
    return (
        <div>
            {isDesktop && <div>데스크탑화면</div>}
            {isMobile && view && (
                <div>
                    {currentStep === 1 && <StepOneForm onSubmit={handleStepOneSubmit} />}
                    {currentStep === 2 && <StepTwoForm onSubmit={handleStepTwoSubmit} />}
                    {currentStep === 3 && <p>Thank you for your submission!</p>}
                    {currentStep !== 3 && (
                        <>
                            {currentStep !== 1 && (
                                <button className="absolute mt-[1rem] text-white text-[2rem] bg-[#d2d2d2] left-8 w-[3.2rem] h-[3rem] rounded-[.4rem]" onClick={handlePrevious}>
                                    <div className="ml-[20%]">
                                        <MdKeyboardArrowLeft />
                                    </div>
                                </button>
                            )}
                            {currentStep === 2 ? (
                                <button onClick={handleSubmit} className="absolute mt-[1rem] text-white text-[1rem] bg-blue right-8 w-[70vw] h-[3rem] rounded-[.4rem]">
                                    등록하기
                                </button>
                            ) : (
                                <button className="absolute  text-white  mt-[1rem] text-[2rem] bg-blue right-8 w-[3.2rem] h-[3rem] rounded-[.4rem]" onClick={() => setCurrentStep(currentStep + 1)}>
                                    <div className="ml-[20%]">
                                        <MdKeyboardArrowRight />
                                    </div>
                                </button>
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
