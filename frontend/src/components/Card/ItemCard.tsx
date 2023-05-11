import React, { FunctionComponent, HTMLProps, useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '../Button';
import { SlOptions } from 'react-icons/sl';
import shield from '../../assets/icons/safezone.png';
import ItemCardOption from '../CardOption/ItemCardOption';
import { useRouter } from 'next/router';

interface dataProps {
    productId: number;
    productImg: string;
    title: string;
    location: string;
    price: number;
    startDate?: string;
    endDate?: string;
    isSafe?: boolean;
    isCart?: boolean;
    menuState?: number;
    onRefresh?: () => void;
}

function ItemCard({ productId, productImg, title, location, price, startDate, endDate, isSafe, isCart, menuState, onRefresh }: dataProps) {
    const router = useRouter();
    const [url, setUrl] = useState<string>('');

    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
    function Dropdown(event: React.MouseEvent) {
        event.stopPropagation();
        event.preventDefault();
        setDropdownVisible(!dropdownVisible);
    }
    useEffect(() => {
        setUrl(window.location.pathname);
    }, []);

    function GoDetail() {
        router.push(`/${productId}`);
    }

    return (
        <div className="w-[100%]" onClick={GoDetail}>
            <div className="flex relative">
                <div className="relative w-[6rem] h-[6rem] mr-[0.8rem] ">
                    <img alt="제품사진" className="w-full  rounded-[.5rem] h-full object-cover " src={productImg} />
                    {isSafe !== undefined && isSafe === true ? <Image src={shield} alt="세이프존 표시" className="absolute left-1 top-1 w-[1.5rem]" /> : null}
                    {isCart !== undefined ? <Button.Heart isActive={isCart} productId={productId} className="absolute right-0 top-1" /> : null}
                </div>
                <div className="flex flex-col w-[70%]">
                    <span className="font-semibold w-[100%] flex items-center justify-between relative">
                        <span className="truncate w-[11.87rem] text-[1.2rem] dark:text-black">{title}</span>
                        {menuState !== undefined ? (
                            <>
                                <SlOptions className="bg-[#F2F2F2] h-[1.5rem] px-[0.4rem] w-[1.5rem] rounded-[0.2rem]" color="gray" onClick={(event: React.MouseEvent) => Dropdown(event)} />
                                <ItemCardOption productId={productId} onRefresh={onRefresh} {...{ isRent: url === '/mypage/rent', menuState, dropdownVisible }} />
                            </>
                        ) : null}
                    </span>
                    <div className="flex items-center mt-[.5rem]">
                        <span className="text-[#8E8E93] mr-[1.5rem]">{location}</span>
                        <div>
                            <span className="font-bold text-[1.3rem] dark:text-black">{price.toLocaleString('ko-KR')}</span>
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
