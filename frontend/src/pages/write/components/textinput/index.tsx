import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import DatePicker from '../Datepicker';
import Image from 'next/image';

type FormValues = {
    title: string;
    price: number;
    description: string;
    startDate: string;
    endDate: string;
};

function TextInput() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = data => {
        console.log(data);
    };
    // 엔터 눌러서 제출 막기
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // 제출 동작 막기
        }
    };
    // 달력
    const [selectedRange, setSelectedRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const handleDatesChange = (range: any) => {
        setSelectedRange(range);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ height: '100%', overflow: 'auto' }}>
            <label>
                <p className="font-bold text-[1.2rem] mb-[0.43rem]">제목</p>
                <input type="text" {...register('title', { required: true })} className=" px-[1rem] w-[100%] h-[2.5rem] bg-lightgrey rounded-[.31rem] focus:outline-none" onKeyPress={handleKeyPress} />
                {errors.title && <span>This field is required</span>}
            </label>
            <br></br>

            <label>
                <p className="font-bold mt-[1rem] text-[1.2rem] mb-[0.43rem] ">대여가격</p>
                <p className="text-darkgrey"> 하루 당 금액</p>
                <input
                    type="number"
                    {...register('price', { required: 'Price is required' })}
                    className="px-[1rem] w-[50%] h-[2.5rem] bg-lightgrey rounded-[.31rem] focus:outline-none
                placeholder:text-darkgrey placeholder: text-[1.2rem] 
                "
                    onKeyPress={handleKeyPress}
                />
                <span className="font-bold ml-[.5rem] text-[1.2rem]">원</span>
                {errors.price && <span>{errors.price.message}</span>}
            </label>
            <br></br>
            <label htmlFor="description">
                <p className="font-bold mt-[1rem] text-[1.2rem] mb-[0.43rem]">설명</p>
                <div style={{ whiteSpace: 'pre-wrap' }}>
                    <textarea
                        id="description"
                        placeholder={`올릴 제품에 대한 설명을 작성해주세요.

- 브랜드/모델명
- 제품의 상태(하자 유무 등)
- 제한 조건(최대 대여 기간 등)

서로 믿고 거래할 수 있도록,
자세하고 정확한 정보를 기재해주세요.`}
                        {...register('description', { required: 'Description is required' })}
                        className="px-[1rem] py-[1rem] w-full h-[16rem] bg-lightgrey  rounded-[.6rem] focus:outline-none placeholder:text-darkgrey placeholder:text-[1rem]"
                        style={{ lineHeight: 1.5 }}
                    />
                </div>
                {errors.description && <span>{errors.description.message}</span>}
            </label>
            <br></br>

            <br></br>
        </form>
    );
}

export default TextInput;
