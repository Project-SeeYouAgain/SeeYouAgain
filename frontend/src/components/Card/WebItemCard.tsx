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
    ownerId?: number;
    isBooked?: boolean;
}

function ItemCard({ productId, productImg, title, location, price, startDate, endDate, isSafe, isCart, menuState, ownerId, isBooked, onRefresh }: dataProps) {
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
            const containerWidth = windowWidth - 135;
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
        <div className="w-full relative" onClick={GoDetail}>
            <div className="w-full h-[200px] relative">
                <Image src={productImg} alt="제품 사진" fill className="aspect-square object-cover rounded-lg w-full h-full" />
                {isCart !== undefined ? <Button.WebHeart isActive={isCart} productId={productId} className="absolute bottom-2 right-2" /> : null}
                {isSafe !== undefined && isSafe === true ? <Image src={shield} alt="세이프존 표시" className="absolute top-2 left-2 w-8 h-8" /> : null}
            </div>

            <div className="items-center w-full px-2 pt-2">
                <span className="font-semibold w-full flex items-center justify-between relative">
                    <p className=" truncate w-full dark:text-black font-bolder">{title}</p>
                    {menuState !== undefined ? (
                        <>
                            <SlOptions className="bg-[#F2F2F2] h-[1.5rem] px-[0.4rem] w-[1.5rem] rounded-[0.2rem]" color="gray" onClick={(event: React.MouseEvent) => Dropdown(event)} />
                            <ItemCardOption productId={productId} onRefresh={onRefresh} ownerId={ownerId} isBooked={isBooked} {...{ isRent: url === '/mypage/rent', menuState, dropdownVisible }} />
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
                    <p className="text-[#8E8E93] text-sm mr-2">{location}</p>
                </span>
            </div>
        </div>
    );
}

export default ItemCard;
