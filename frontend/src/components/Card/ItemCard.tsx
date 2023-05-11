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
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            console.log(windowWidth);
            const containerWidth = windowWidth - 127;
            setContainerWidth(containerWidth);
        };

        // 초기 로드 및 윈도우 크기 변경 이벤트에 대한 이벤트 핸들러 등록
        handleResize();
        window.addEventListener('resize', handleResize);

        // 컴포넌트 언마운트 시 이벤트 핸들러 제거
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="w-full flex mt-[0.4rem] relative border-t-2 border-solid py-4" onClick={GoDetail}>
            <div className="w-[95px] h-[95px] relative">
                <Image src={productImg} alt="제품 사진" fill className="aspect-square rounded-lg w-full h-full" />
                {isCart !== undefined ? <Button.Heart isActive={isCart} productId={productId} className="absolute left-1 bottom-1" /> : null}
            </div>
            <div className="items-center p-1 pl-4" style={{ width: containerWidth }}>
                <span className="font-semibold w-full flex items-center justify-between relative">
                    <p className=" truncate dark:text-black font-bolder">{title}</p>
                    {menuState !== undefined ? (
                        <>
                            <SlOptions className="bg-[#F2F2F2] h-[1.5rem] px-[0.4rem] w-[1.5rem] rounded-[0.2rem]" color="gray" onClick={(event: React.MouseEvent) => Dropdown(event)} />
                            <ItemCardOption productId={productId} onRefresh={onRefresh} {...{ isRent: url === '/mypage/rent', menuState, dropdownVisible }} />
                        </>
                    ) : (
                        <span className="h-[1.5rem] px-[0.4rem] w-[1.5rem]"></span>
                    )}
                </span>

                {price >= 100000 && (
                    <span>
                        <span className="font-bold dark:text-black">{(price / 10000).toLocaleString('ko-KR')}</span>
                        <span className="text-[#8E8E93] text-sm">만원 /일</span>
                    </span>
                )}
                {price < 100000 && (
                    <span>
                        <span className="font-bold dark:text-black">{price.toLocaleString('ko-KR')}</span>
                        <span className="text-[#8E8E93] text-sm whitespace-nowrap">원 /일</span>
                    </span>
                )}
                <span className="flex items-center">
                    <p className="text-[#8E8E93] text-sm mr-2">{location}</p> {isSafe !== undefined && isSafe === true ? <Image src={shield} alt="세이프존 표시" className="w-4 h-4" /> : null}
                </span>
                {startDate !== undefined && endDate !== undefined ? (
                    <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="flex text-darkgrey text-sm">
                            <p className="font-bold mr-1 whitespace-nowrap">대여일</p>
                            <p className="whitespace-nowrap">{startDate}</p>
                        </div>
                        <div className="flex text-darkgrey text-sm justify-end">
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
