import React, { FunctionComponent, HTMLProps, useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '../Button';
import { SlOptions } from 'react-icons/sl';
import shield from '../../assets/icons/safezone.png';
import ItemCardOption from '../CardOption/ItemCardOption';
import { axAuth } from '@/apis/axiosinstance';

interface dataProps {
    productId?: number;
    productImg: string;
    title: string;
    location: string;
    price: number;
    startDate?: string;
    endDate?: string;
    isSafe?: boolean;
    isCart?: boolean;
    menuState?: number;
}

function ItemCard({ productId, productImg, title, location, price, startDate, endDate, isSafe, isCart, menuState }: dataProps) {
    const [url, setUrl] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(false);
    if (isCart !== undefined) {
        setIsActive(isCart);
    }

    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
    function Dropdown() {
        setDropdownVisible(!dropdownVisible);
    }
    useEffect(() => {
        setUrl(window.location.pathname);
    }, []);

    // 찜하기 axios
    // useEffect(() => {
    //     const product_id = productId;
    //     axAuth({
    //         method: 'post',
    //         url: `/product-service/auth/cart/${product_id}`,
    //     })
    // });

    return (
        <div className="w-[100%]">
            <div className="flex mt-[0.4rem] relative">
                <div className="w-[8rem] h-[7.4rem] relative mr-[0.8rem]">
                    <Image src={productImg} alt="제품 사진" className="aspect-square rounded-[0.6rem]" layout="fill" objectFit="cover" />
                    {isSafe !== undefined && isSafe === true ? <Image src={shield} alt="세이프존 표시" className="absolute left-1 top-1 w-[1.5rem]" /> : null}
                    {isCart !== undefined ? <Button.Heart isActive={isActive} className="absolute right-0 top-1" onClick={() => setIsActive(!isActive)} /> : null}
                </div>
                <div className="flex flex-col w-[70%]">
                    <span className="font-semibold w-[100%] flex items-center justify-between relative">
                        <span className="truncate w-[11.87rem] text-[1.2rem]">{title}</span>
                        {menuState !== undefined ? (
                            <>
                                <SlOptions className="bg-[#F2F2F2] h-[1.5rem] px-[0.4rem] w-[1.5rem] rounded-[0.2rem]" color="gray" onClick={Dropdown} />
                                <ItemCardOption {...{ isRent: url === '/mypage/rent', menuState, dropdownVisible }} />
                            </>
                        ) : null}
                    </span>
                    <div className="flex items-center mt-[.5rem]">
                        <span className="text-[#8E8E93] mr-[1.5rem]">{location}</span>
                        <div>
                            <span className="font-bold text-[1.3rem]">{price.toLocaleString('ko-KR')}</span>
                            <span className="text-[#8E8E93]">원 /일</span>
                        </div>
                    </div>
                    {startDate !== undefined && endDate !== undefined ? (
                        <div className="flex flex-col justify-between absolute bottom-0">
                            <div className="text-darkgrey text-[0.87rem]">
                                <span className="font-bold mr-[1rem]">대여일</span>
                                <span>{startDate}</span>
                            </div>
                            <div className="text-darkgrey text-[0.87rem]">
                                <span className="font-bold mr-[1rem]">반납일</span>
                                <span>{endDate}</span>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default ItemCard;
