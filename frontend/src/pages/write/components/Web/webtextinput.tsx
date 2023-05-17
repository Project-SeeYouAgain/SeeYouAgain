import React, { useEffect, useState } from 'react';
import DatePicker from '../Calender';
import Image from 'next/image';

function WebTextInput({ setData, onSubmit, data }: { setData: React.Dispatch<React.SetStateAction<StepTwoData>>; onSubmit: (data: StepTwoData) => void; data: StepTwoData }) {
    // 엔터 눌러서 제출 막기
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // 제출 동작 막기
        }
    };

    const [description, setDescription] = useState<string>('');

    // 변화 감지해서 submit하기
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData(prevData => ({ ...prevData, title: event.target.value }));
        onSubmit(data);
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData(prevData => ({ ...prevData, price: Number(event.target.value) }));
        onSubmit(data);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setData(prevData => ({ ...prevData, description: event.target.value }));
        onSubmit(data);
    };

    return (
        <div>
            <div className="grid grid-cols-[1fr,3fr] items-center mb-8">
                <span className="font-bold  text-[1.2rem] mb-[0.43rem]">제목</span>
                <input
                    type="text"
                    className="px-[1rem] w-[40vw] h-[3rem] border border-darkgrey rounded-md focus:outline-none"
                    placeholder="제목을 입력해주세요."
                    onKeyPress={handleKeyPress}
                    onChange={handleTitleChange}
                />
            </div>
            {/* AI로 시세 가격 추천이 가능할까?  */}
            <div className="grid grid-cols-[1fr,3fr] mt-[3rem] items-center mb-8">
                <span className="font-bold mt-[1rem] text-[1.2rem] mb-[0.43rem]">대여가격</span>
                <div className="flex items-center">
                    <input
                        type="number"
                        className="px-[1rem] h-[3rem] rounded-md border border-darkgrey focus:outline-none placeholder:text-darkgrey placeholder:text-[1.2rem]"
                        onKeyPress={handleKeyPress}
                        onChange={handlePriceChange}
                    />
                    <span className="font-bold ml-[.5rem] text-[1.2rem]">원</span>
                </div>
                <span className="text-darkgrey font-NanumNeo text-[.9rem]">* 하루 당 금액을 입력해주세요.</span>
            </div>
            <div className="grid grid-cols-[1fr,3fr] mt-[3rem] ">
                <p className="font-bold mt-[1rem] text-[1.2rem] mb-[0.43rem]">설명</p>
                <div style={{ whiteSpace: 'pre-wrap' }}>
                    <textarea
                        defaultValue={description}
                        onChange={handleDescriptionChange}
                        placeholder={`올릴 제품에 대한 설명을 작성해주세요.

- 브랜드/모델명
- 제품의 상태(하자 유무 등)
- 제한 조건(최대 대여 기간 등)

서로 믿고 거래할 수 있도록,
자세하고 정확한 정보를 기재해주세요.`}
                        className="px-[1rem] rounded-md py-[1rem] w-full h-[16rem] border border-darkgrey focus:outline-none placeholder:text-darkgrey placeholder:text-[1rem]"
                        style={{ lineHeight: 1.5 }}
                    />
                </div>
            </div>
        </div>
    );
}

export default WebTextInput;
