import React, { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';
import Container from '@/components/Container';
import Body from '@/components/Container/components/Body';
import TextInput from '../textinput';
import Category from '../Category';
import TagInput from '../TagInput';
import Image from 'next/image';
import locationImg from '../../../../../public/icon/3Dloca.png';
import Calender from '../Calender';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PickLocation from '../../picklocation';
import { BsFillCheckSquareFill } from 'react-icons/bs';
import { BsSquare } from 'react-icons/bs';

type StepProps = {
    onSubmit: (data: StepTwoData) => void;
    onPrevious?: () => void;
};

const StepTwoForm = ({ onSubmit }: StepProps) => {
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

    const handleImageChange = (files: File[]) => {
        setData(prevData => ({ ...prevData, productImg: files }));
        onSubmit(data);
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setData(prevData => ({ ...prevData, category: event.target.value }));
        onSubmit(data);
    };

    const handleTagChange = (newData: Partial<StepTwoData>) => {
        setData(prevData => ({ ...prevData, ...newData }));
        onSubmit(data);
    };

    const handleDateChange = (startDate: Date | null, endDate: Date | null) => {
        setData(prevData => ({ ...prevData, startDate, endDate }));
        onSubmit(data);
    };

    // 거래장소 선택 모달용
    const [isLocationOn, setIsLocationOn] = useState(false);

    // 세이프존 선택
    const [isSafe, setIsSafe] = useState(false);

    return (
        <Container>
            <Body>
                <div className="mt-[1rem] ">
                    <p className="mb-[1rem] font-bold text-[1.2rem] "> 상품 이미지</p>
                    <ImageUpload onChange={handleImageChange} />
                </div>
                {/* 카테고리 */}
                <div className="mt-[1rem]">
                    <p className="mb-[0.43rem] font-bold text-[1.2rem] ">카테고리 </p>
                    <Category onChange={handleCategoryChange} />
                </div>
                {/* 텍스트 */}
                <div className="mt-[1rem]">
                    <TextInput data={data} setData={setData} onSubmit={onSubmit} />
                </div>
                {/* 태그 */}
                <div className="mt-[1rem]">
                    <p className="mb-[0.43rem] font-bold text-[1.2rem] "> 태그 </p>
                    <TagInput value={data.tag} onChange={handleTagChange} />
                </div>
                {/* 대여일정 */}
                <div>
                    <p className="mb-[1.2rem] font-bold text-[1.2rem]"> 대여일정 </p>
                    <Calender onChange={handleDateChange} />
                </div>
                {/* 거래장소 */}
                <p className="mb-[1.2rem] font-bold text-[1.2rem]"> 거래장소 </p>
                {isLocationOn && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 z-50">
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-white"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <PickLocation data={data} onSubmit={onSubmit} setData={setData} setIsLocationOn={setIsLocationOn} />
                        </div>
                    </div>
                )}
                <div className="relative" onClick={() => setIsLocationOn(true)}>
                    <div className="m-auto w-[100%] h-[5rem] rounded-[.625rem]" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)', opacity: 0.5 }}></div>
                    <div>
                        <Image src={locationImg} alt="camera" className="w-[4rem] absolute top-2 right-[1.5rem]"></Image>
                        <span className="font-bold absolute top-[40%] left-[8%] text-darkgrey ">{data.location.RegionCode ? '거래장소 : ' + data.location.RegionCode : '거래장소 선택하러 가기'}</span>
                    </div>
                </div>
                {/* 세이프존 거래 */}
                <div
                    className="flex mt-[1rem] items-center "
                    onClick={() => {
                        setIsSafe(!isSafe);
                        setData(prevData => ({ ...prevData, isSafe }));
                        onSubmit(data);
                    }}
                >
                    <span>{isSafe ? <BsFillCheckSquareFill className="text-blue w-[1.4rem] h-[1.4rem]" /> : <BsSquare className="text-darkgrey w-[1.4rem] h-[1.4rem]" />}</span>
                    <span className="ml-[.5rem]">
                        <span className="font-bold text-[1.2rem] text-blue">SAFEZONE</span>
                        <span className="font-bold text-[1.2rem] text-darkgrey"> 에서 거래 할게요.</span>
                    </span>
                </div>
                <p className="text-[.8rem] text-darkgrey"> 안전한 세이프존을 거래장소로 이용해보세요!</p>
                <div className="mb-[2rem]"></div>
            </Body>
        </Container>
    );
};
export default StepTwoForm;
