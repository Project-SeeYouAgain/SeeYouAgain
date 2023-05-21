import React, { useEffect, useState } from 'react';
import DatePicker from '../Calender';
import Image from 'next/image';

function TextInput({ setData, onSubmit, data }: { setData: React.Dispatch<React.SetStateAction<StepTwoData>>; onSubmit: (data: StepTwoData) => void; data: StepTwoData }) {
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
        onSubmit({ ...data, title: event.target.value });
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData(prevData => ({ ...prevData, price: Number(event.target.value) }));
        onSubmit({ ...data, price: Number(event.target.value) });
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setData(prevData => ({ ...prevData, description: event.target.value }));
        onSubmit({ ...data, description: event.target.value });
    };

    return (
        <div>
            <label>
                <p className="font-bold text-[1.2rem] mb-[0.43rem]">제목</p>
                <input type="text" className=" px-[1rem] w-[100%] h-[2.5rem] bg-lightgrey rounded-[.31rem] focus:outline-none" onKeyPress={handleKeyPress} onChange={handleTitleChange} />
            </label>
            <br></br>
            {/* AI로 시세 가격 추천이 가능할까?  */}
            <label>
                <p className="font-bold mt-[1rem] text-[1.2rem] mb-[0.43rem] ">대여가격</p>
                <p className="text-darkgrey"> 하루 당 금액</p>
                <input
                    type="number"
                    className="px-[1rem] w-[50%] h-[2.5rem] bg-lightgrey rounded-[.31rem] focus:outline-none
                placeholder:text-darkgrey placeholder: text-[1.2rem] 
                "
                    onKeyPress={handleKeyPress}
                    onChange={handlePriceChange}
                />
                <span className="font-bold ml-[.5rem] text-[1.2rem]">원</span>
            </label>
            <br></br>
            <div>
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
                        className="px-[1rem] py-[1rem] w-full h-[16rem] bg-lightgrey  rounded-[.6rem] focus:outline-none placeholder:text-darkgrey placeholder:text-[1rem]"
                        style={{ lineHeight: 1.5 }}
                    />
                </div>
            </div>
        </div>
    );
}

export default TextInput;
