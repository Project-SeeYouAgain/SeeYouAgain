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
        <Container>
            <Body>
                <div>
                    <p className="text-center mt-[30%] font-semibold text-[1.2rem] text-blue "> 게시글 유형을 선택해주세요.</p>
                </div>
                <div className="mt-[4rem]">
                    <div
                        onClick={() => onHandleData(false)}
                        className={`relative flex w-[100%] h-[15rem] rounded-[1rem]  mb-[1rem] ${!isRenter && 'bg-blue'}`}
                        style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}
                    >
                        <span className={`font-bold ${isRenter ? 'text-blue' : 'text-white'} text-[3rem] absolute bottom-1 left-[1.2rem]`}> 구해요 </span>
                        <Image src={want} alt="want" className="w-[10rem] absolute right-0"></Image>
                    </div>

                    <div
                        onClick={() => onHandleData(true)}
                        className={`relative  flex ${isRenter && 'bg-blue'} w-[100%] h-[15rem] rounded-[1rem]  mb-[1rem]`}
                        style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}
                    >
                        <div>
                            <span className={`font-bold ${isRenter ? 'text-white' : 'text-blue'} text-[3rem] absolute top-2 left-[1.2rem]`}> 빌려줘요 </span>
                            <Image src={renter} alt="want" className="w-[12rem] bottom-0 absolute right-0"></Image>
                        </div>
                    </div>
                </div>
            </Body>
        </Container>
    );
};

export default StepOneForm;
