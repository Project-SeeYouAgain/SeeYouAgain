import React, { useState } from 'react';
import styles from './userLocation.module.scss';
import Container from '@/components/Container';
import { AiOutlineClose, AiFillCamera } from 'react-icons/ai';
import Body from '@/components/Container/components/Body';

import StarRating from '@/components/StarRating';
import SquareLg from '@/components/Button/SquareLg';
import Image from 'next/image';

function Rating() {
    const title = '닌텐도 스위치/라이트 대여 가능';
    const [image, setImage] = useState<File | null>(null);

    const handleRatingChange = (rating: number) => {
        console.log(`별점이 변경되었습니다: ${rating}`);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setImage(event.target.files[0]);
        }
    };

    return (
        <div className="relative">
            <AiOutlineClose className="text-blue absolute top-3 right-3" size={25} />
            <div className="px-[1.88rem]">
                <div className="text-center py-8 text-xl font-bold">
                    <div className="w-3/4 flex m-auto">
                        <p className="truncate text-gray-400">{title}</p>
                        <p className="whitespace-nowrap">에 대한</p>
                    </div>
                    <p>리뷰를 남겨주세요!</p>
                </div>
                <StarRating maxRating={5} onChange={handleRatingChange} />
                {!image && (
                    <div className="w-full h-[40vh] bg-blue/10 rounded-lg my-6 cursor-pointer flex items-center justify-center">
                        <label>
                            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                            <AiFillCamera className="m-auto text-blue" size={60} />
                        </label>
                    </div>
                )}
                {image && (
                    <div className="w-full rounded-lg my-6 cursor-pointer flex items-center justify-center">
                        <label>
                            <div className="w-full h-[40vh]">
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                <img src={URL.createObjectURL(image)} alt="uploaded" className="w-full h-[40vh] object-cover rounded-lg" />
                            </div>
                        </label>
                    </div>
                )}
                <textarea className="w-full border-solid bg-gray-200 rounded-lg p-4" rows={3} placeholder="이곳에 리뷰를 작성해주세요."></textarea>
                <SquareLg bgColor="blue" textColor="white" innerValue="리뷰 작성" className="mt-4" />
            </div>
        </div>
    );
}

export default Rating;
