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
        <div className="w-full flex mt-[0.4rem] relative border-t-2 border-solid py-4" onClick={GoDetail}>
            <div className="w-[82.28px] h-[82.28px] relative">
                <Image src={productImg} alt="제품 사진" className="aspect-square rounded-2" fill />
                {isSafe !== undefined && isSafe === true ? <Image src={shield} alt="세이프존 표시" className="absolute left-1 top-1 w-4" /> : null}
                {isCart !== undefined ? <Button.Heart isActive={isCart} productId={productId} className="absolute right-1 bottom-1" /> : null}
            </div>
            <div className="grid grid-rows-3 items-center w-3/4 py-1 px-2">
                <span className="font-semibold w-full flex items-center justify-between relative">
                    <span className="truncate flex-grow dark:text-black">{title}</span>
                    {menuState !== undefined ? (
                        <>
                            <SlOptions className="bg-[#F2F2F2] h-[1.5rem] px-[0.4rem] w-[1.5rem] rounded-[0.2rem]" color="gray" onClick={(event: React.MouseEvent) => Dropdown(event)} />
                            <ItemCardOption productId={productId} onRefresh={onRefresh} {...{ isRent: url === '/mypage/rent', menuState, dropdownVisible }} />
                        </>
                    ) : null}
                </span>
                <div className="flex justify-between items-center">
                    <span className="text-[#8E8E93] text-sm">{location}</span>
                    {price >= 100000 && (
                        <span>
                            <span className="font-bold text-sm dark:text-black">{(price / 10000).toLocaleString('ko-KR')}</span>
                            <span className="text-[#8E8E93] text-xs">만원 /일</span>
                        </span>
                    )}
                    {price < 100000 && (
                        <span>
                            <span className="font-bold text-sm dark:text-black">{price.toLocaleString('ko-KR')}</span>
                            <span className="text-[#8E8E93] text-xs whitespace-nowrap">원 /일</span>
                        </span>
                    )}
                </div>
                {startDate !== undefined && endDate !== undefined ? (
                    <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="flex text-darkgrey text-xs">
                            <p className="font-bold mr-1 whitespace-nowrap">대여일</p>
                            <p className="whitespace-nowrap">{startDate}</p>
                        </div>
                        <div className="flex text-darkgrey text-xs justify-end">
                            <p className="font-bold mr-1 whitespace-nowrap">반납일</p>
                            <p className="whitespace-nowrap">{endDate}</p>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default ItemCard;
