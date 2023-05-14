import WebNavbar from '@/components/Container/components/WebNavbar';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import want from '../../../../../public/icon/want.png';
import renter from '../../../../../public/icon/renter.png';
import Category from '../Web/webcate';
import TextInput from '../Web/webtextinput';
import TagInput from '../Web/webtaginput';
import Calender from '../Web/webcalender';
import PickLocation from '../Web/weblocation';
import { BsFillCheckSquareFill } from 'react-icons/bs';
import { BsSquare } from 'react-icons/bs';
import Modal from '../Modal';
import locationImg from '../../../../../public/icon/3Dloca.png';
import WebImageUpload from '@/pages/write/components/Web/WebImageUpload';

interface Props {
    handleSubmit: () => void;
}

function index({ handleSubmit }: Props) {
    const [isRenter, setIsRenter] = useState(false);
    const [typedata, setTypeData] = useState<StepOneData>({ type: false });
    const handleStepOneSubmit = (data: StepOneData) => {
        setStepOneData(data);
    };

    const handleStepTwoSubmit = (data: StepTwoData) => {
        setStepTwoData(data);
    };
    const [data, setData] = useState<StepTwoData>({
        productImg: [],
        title: '',
        category: '',
        price: 0,
        description: '',
        startDate: null,
        endDate: null,
        location: {
            lat: 0,
            lng: 0,
            RegionCode: '',
        },
        isSafe: false,
        tag: [],
    });

    function onHandletypeData(type: boolean) {
        setIsRenter(type);
        const newData = { type };
        setTypeData(newData);
        handleStepOneSubmit(newData);
    }

    const [stepOneData, setStepOneData] = useState<StepOneData | null>(null);
    const [stepTwoData, setStepTwoData] = useState<StepTwoData | null>(null);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setData(prevData => ({ ...prevData, category: event.target.value }));
    };

    const handleTagChange = (newData: Partial<StepTwoData>) => {
        setData(prevData => ({ ...prevData, ...newData }));
    };

    const handleDateChange = (startDate: Date | null, endDate: Date | null) => {
        setData(prevData => ({ ...prevData, startDate, endDate }));
    };
    const handleSafeChange = () => {
        const updatedIsSafe = !isSafe;
        setIsSafe(updatedIsSafe);
        setData(prevData => ({ ...prevData, isSafe: updatedIsSafe }));
    };
    const handleLocationChange = () => {
        setIsLocationOn(true);
    };
    // 거래장소 선택 모달용
    const [isLocationOn, setIsLocationOn] = useState(false);

    // 세이프존 선택
    const [isSafe, setIsSafe] = useState(false);

    // 모달
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>('');

    const handleSubmitClick = () => {
        // 데이터 유효성 검사
        if (!data.productImg || data.productImg.length === 0) {
            setIsModalOpen(true);
            setModalMessage('상품 이미지');
            return;
        }

        if (!data.title || data.title.trim() === '') {
            setIsModalOpen(true);
            setModalMessage('제목');
            return;
        }

        if (!data.category || data.category.trim() === '') {
            setIsModalOpen(true);
            setModalMessage('카테고리');
            return;
        }

        if (!data.price || data.price <= 0) {
            setIsModalOpen(true);
            setModalMessage('가격');
            return;
        }

        if (!data.description || data.description.trim() === '') {
            setIsModalOpen(true);
            setModalMessage('설명');
            return;
        }

        if (!data.startDate || !data.endDate) {
            setIsModalOpen(true);
            setModalMessage('대여일정 ');
            return;
        }

        if (!data.location || data.location.RegionCode === '') {
            setIsModalOpen(true);
            setModalMessage('거래장소');
            return;
        }

        // 데이터가 유효하면 handleSubmit 함수 호출
        handleSubmit();
    };
    useEffect(() => {
        // 클라이언트에서만 실행되는 부작용
        // ...
    }, []);

    return (
        <div className="px-[10rem]">
            <WebNavbar />
            {/* 글 유형 */}
            <div className="mt-[7rem] ">
                <div className="flex justify-center">
                    <div
                        onClick={() => onHandletypeData(false)}
                        className={`relative w-[20vw] h-[18vh] rounded-[1rem]  mb-[1rem] ${!isRenter && 'bg-blue'}`}
                        style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}
                    >
                        <span className={`font-bold ${isRenter ? 'text-blue' : 'text-white'} text-[2rem] absolute bottom-1 left-[1.2rem]`}> 구해요 </span>
                        <Image src={want} alt="want" className="w-[40%] h-[90%] absolute bottom-0 right-0" />
                    </div>

                    <div
                        onClick={() => onHandletypeData(true)}
                        className={`relative  ${isRenter && 'bg-blue'} w-[20vw] h-[18vh] rounded-[1rem]  mb-[1rem] hover: `}
                        style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}
                    >
                        <span className={`font-bold ${isRenter ? 'text-white' : 'text-blue'} text-[2rem] absolute top-2 left-[1.2rem]`}> 빌려줘요 </span>
                        <Image src={renter} alt="want" className="w-[55%] h-[90%]  absolute bottom-0 right-0" />
                    </div>
                </div>
            </div>
            {/* 나머지 */}
            <div className="px-[1.88rem]">
                <div className="mt-[1rem] ">
                    <p className="mb-[1rem] font-bold text-[1.2rem] "> 상품 이미지</p>
                    <WebImageUpload data={data} setData={setData} onSubmit={handleStepTwoSubmit} />
                </div>
                {/* 카테고리 */}
                <div className="mt-[2rem]">
                    <Category onChange={handleCategoryChange} />
                </div>
                {/* 텍스트 */}
                <div className="mt-[2rem]">
                    <TextInput data={data} setData={setData} onSubmit={handleStepTwoSubmit} />
                </div>
                {/* 태그 */}
                <div className="mt-[1rem]">
                    <TagInput value={data.tag} onChange={handleTagChange} />
                </div>
                {/* 대여일정 */}
                <div>
                    <Calender onChange={handleDateChange} />
                </div>
                {/* 거래장소 */}
                <p className="mb-[1.2rem] font-bold text-[1.2rem]"> 거래장소 </p>
                {isLocationOn && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 z-50">
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-white"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <PickLocation data={data} onSubmit={handleStepTwoSubmit} setData={setData} setIsLocationOn={setIsLocationOn} />
                        </div>
                    </div>
                )}
                <div className="relative" onClick={handleLocationChange}>
                    <div className="m-auto w-[100%] h-[5rem] rounded-[.625rem]" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)', opacity: 0.5 }}></div>
                    <div>
                        <Image src={locationImg} alt="camera" className="w-[4rem] absolute top-2 right-[1.5rem]"></Image>
                        <span className="font-bold absolute top-[40%] left-[8%] text-darkgrey ">{data.location.RegionCode ? '거래장소 : ' + data.location.RegionCode : '거래장소 선택하러 가기'}</span>
                    </div>
                </div>
                {/* 세이프존 거래 */}
                <div className="flex mt-[1rem] items-center " onClick={handleSafeChange}>
                    <div>
                        <span>{isSafe ? <BsFillCheckSquareFill className="text-blue w-[1.4rem] h-[1.4rem]" /> : <BsSquare className="text-darkgrey w-[1.4rem] h-[1.4rem]" />}</span>
                    </div>
                    <span className="ml-[.5rem]">
                        <span className="font-bold text-[1.2rem] text-blue">SAFEZONE</span>
                        <span className="font-bold text-[1.2rem] text-darkgrey"> 에서 거래 할게요.</span>
                    </span>
                </div>
                <p className=" text-darkgrey mb-20"> 안전한 세이프존을 거래장소로 이용해보세요!</p>
            </div>
            <button onClick={handleSubmitClick} className="fixed top-[20vh] w-20 right-10 text-black text-[1rem] border border-darkgrey h-[3rem] hover:bg-black hover:text-white  ">
                등록하기
            </button>
            <Modal isModalOpen={isModalOpen} message={modalMessage} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}

export default index;
