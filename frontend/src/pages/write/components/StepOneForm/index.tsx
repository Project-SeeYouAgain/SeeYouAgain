import React, { useState } from 'react';
import Image from 'next/image';
import want from '../../../../../public/icon/want.png';
import renter from '../../../../../public/icon/renter.png';
import Container from '@/components/Container';
import Body from '@/components/Container/components/Body';
type StepProps = {
    onSubmit: (data: StepOneData) => void;
    onPrevious?: () => void;
};

// 첫번째 페이지
const StepOneForm = ({ onSubmit }: StepProps) => {
    // 글 유형 선택 (빌려줘요: 0 구해요 : 1)
    const [isRenter, setIsRenter] = useState(false);
    const [data, setData] = useState<StepOneData>({ type: false });

    function onHandleData(type: boolean) {
        setIsRenter(type);
        const newData = { type };
        setData(newData);
        onSubmit(newData);
    }

    return (
        <div className="w-[100vw] h-[90vh] px-[1.88rem] flex items-center justify-center">
            <div className="w-full">
                <p className="text-center font-semibold text-[1.2rem] text-blue mb-[5%]"> 게시글 유형을 선택해주세요.</p>
                <div
                    onClick={() => onHandleData(false)}
                    className={`relative w-[100%] h-[25vh] rounded-[1rem]  mb-[1rem] ${!isRenter && 'bg-blue'}`}
                    style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}
                >
                    <span className={`font-bold ${isRenter ? 'text-blue' : 'text-white'} text-[13vw] absolute bottom-1 left-[1.2rem]`}> 구해요 </span>
                    <Image src={want} alt="want" className="w-[40%] h-[90%] absolute bottom-0 right-0" />
                </div>

                <div
                    onClick={() => onHandleData(true)}
                    className={`relative  ${isRenter && 'bg-blue'} w-[100%] h-[25vh] rounded-[1rem]  mb-[1rem] hover: `}
                    style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}
                >
                    <span className={`font-bold ${isRenter ? 'text-white' : 'text-blue'} text-[13vw] absolute top-2 left-[1.2rem]`}> 빌려줘요 </span>
                    <Image src={renter} alt="want" className="w-[55%] h-[90%] absolute bottom-0 right-0" />
                </div>
            </div>
        </div>
    );
};

export default StepOneForm;
