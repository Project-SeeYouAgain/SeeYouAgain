import React, { FunctionComponent, HTMLProps } from 'react';
import Image from 'next/image';
import Button from '../Button';
import { AiFillStar } from 'react-icons/ai';

function ItemCard(data: object) {
    return (
        <div className="w-[100%]">
            <span className="bg-black rounded-full text-white px-[0.8rem]">
                {data.startDate} ~ {data.endDate}
            </span>
            <div className="flex">
                <div className="w-[25%] relative mr-[0.8rem]">
                    <Image src={data.productImg[0]} alt="임시 사진" className="aspect-square" layout="fill" objectFit="cover" />
                </div>
                <div className="flex flex-col">
                    <span className="font-bold w-[100%] truncate">{data.title}</span>
                    <span className="text-[#8E8E93]">{data.location}</span>
                    <div className="flex">
                        <span className="font-bold">{data.price}</span>
                        <span className="text-[#8E8E93] mr-[2rem]">원 /일</span>
                        <span className="flex items-center text-darkgrey">
                            <AiFillStar className="mr-[0.2rem]" color="darkgrey" />
                            {data.score}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <Button.Round textColor="white" bgColor="blue" innerValue="연장 신청" className="mr-[0.3rem]" />
                        <Button.Round textColor="white" bgColor="red" innerValue="반납 신청" className="mr-[0.3rem]" />
                        <Button.Heart isActive={false} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemCard;
