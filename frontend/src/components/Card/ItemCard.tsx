import React, { FunctionComponent, HTMLProps, useState } from 'react';
import Image from 'next/image';
import Button from '../Button';
import { AiFillStar } from 'react-icons/ai';
import img from '../../images/img_step_01.jpg';
import { SlOptions } from 'react-icons/sl';
import shield from '../../assets/icons/safezone.png';

// 괄호 안에 << data: object >> 이거 넣으시면 됩니다.
function ItemCard() {
    // 임시 데이터 입니다. 삭제하시면 됩니다.
    const data = {
        startDate: '2023.04.07(금)',
        endDate: '2023.04.27(목)',
        productImg: [img],
        title: '닌텐도 팝니다.',
        location: '장덕동',
        price: '4400',
        score: '4.8',
    };

    const [dropdownVisible, setDropdownVisible] = useState(false);
    function Dropdown() {
        setDropdownVisible(!dropdownVisible);
    }

    return (
        <div className="w-[100%]">
            {/* <span className="bg-black rounded-full text-white px-[0.8rem] py-[0.2rem]">
                {data.startDate} ~ {data.endDate}
            </span> */}
            <div className="flex mt-[0.4rem] relative">
                <div className="w-[8rem] h-[7.4rem] relative mr-[0.8rem]">
                    <Image src={data.productImg[0]} alt="임시 사진" className="aspect-square rounded-[0.6rem]" layout="fill" objectFit="cover" />
                    <Image src={shield} alt="세이프존 표시" className="absolute left-1 top-1 w-[1.5rem]" />
                    <Button.Heart isActive={false} className="absolute right-0 top-1" />
                </div>
                <div className="flex flex-col w-[70%]">
                    <span className="font-semibold w-[100%] flex items-center justify-between relative">
                        <span className="truncate w-[11.87rem] text-[1.2rem]">{data.title}</span>
                        <SlOptions className="bg-[#F2F2F2] h-[1.5rem] px-[0.4rem] w-[1.5rem] rounded-[0.2rem]" color="gray" onClick={Dropdown} />
                        {dropdownVisible && (
                            <div className="bg-white shadow-md rounded absolute top-[1.5rem] right-0 rounded-[3px]">
                                <a href="#" className="block px-4 py-2">
                                    대여일정
                                </a>
                                <a href="#" className="block px-4 py-2">
                                    반납하기
                                </a>
                            </div>
                        )}
                    </span>
                    {/* <span className="flex items-center text-darkgrey leading-[1px]">
                        <AiFillStar className="mr-[0.2rem]" color="darkgrey" />
                        {data.score}
                    </span> */}
                    <div className="flex items-center mt-[.5rem]">
                        <span className="text-[#8E8E93] mr-[1.5rem]">{data.location}</span>
                        <div>
                            <span className="font-bold text-[1.3rem]">{data.price}</span>
                            <span className="text-[#8E8E93]">원 /일</span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between absolute bottom-0">
                        <div className="text-darkgrey text-[0.87rem]">
                            <span className="font-bold mr-[1rem]">대여일</span>
                            <span>{data.startDate}</span>
                        </div>
                        <div className="text-darkgrey text-[0.87rem]">
                            <span className="font-bold mr-[1rem]">반납일</span>
                            <span>{data.endDate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemCard;
