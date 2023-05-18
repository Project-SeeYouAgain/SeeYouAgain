import React, { FunctionComponent, HTMLProps, useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '../Button';
import { SlOptions } from 'react-icons/sl';
import shield from '../../assets/icons/safezone.png';
import ItemCardOption from '../CardOption/ItemCardOption';
import { useRouter } from 'next/router';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { axAuth } from '@/apis/axiosinstance';
import { userState, productState } from 'recoil/user/atoms';
import { useRecoilValue, useRecoilState } from 'recoil';

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
    ownerId?: number;
    isBooked?: boolean;
    reservationId?: number;
    hasReview?: boolean;
}

function ItemCard({ productId, productImg, title, location, price, startDate, endDate, isSafe, isCart, menuState, ownerId, isBooked, reservationId, hasReview }: dataProps) {
    const router = useRouter();
    const [url, setUrl] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>();
    const token = useRecoilValue(userState).accessToken;
    const [state, setState] = useState<string | null>(null);
    const [productStateData, setProductStateData] = useRecoilState(productState);

    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
    function Dropdown(event: React.MouseEvent) {
        event.stopPropagation();
        event.preventDefault();
        setDropdownVisible(!dropdownVisible);
    }

    useEffect(() => {
        const click = localStorage.getItem('click');
        setState(click);
        setUrl(window.location.pathname);
    }, []);

    useEffect(() => {
        if (isCart !== undefined && isCart !== null) {
            setIsActive(isCart);
        }
    }, [isCart, menuState]);

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

    const ClickHeart = (event: React.MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
        const url = `/product-service/auth/cart/${productId}`;
        if (isActive) {
            axAuth(token)({ method: 'delete', url: url })
                .then(() => {
                    setIsActive(!isActive);
                    setProductStateData({
                        ...productStateData,
                        refreshKey: productStateData.refreshKey + 1,
                    });
                })
                .catch(err => console.log(err));
        } else {
            axAuth(token)({ method: 'post', url: url })
                .then(() => {
                    setIsActive(!isActive);
                    setProductStateData({
                        ...productStateData,
                        refreshKey: productStateData.refreshKey + 1,
                    });
                })
                .catch(err => console.log(err));
        }
    };
    const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const desktopQuery = window.matchMedia('(min-width:767px)');
        const mobileQuery = window.matchMedia('(max-width:767px)');

        const handleDesktopQuery = (event: MediaQueryListEvent) => {
            setIsDesktop(event.matches);
        };

        const handleMobileQuery = (event: MediaQueryListEvent) => {
            setIsMobile(event.matches);
        };

        desktopQuery.addEventListener('change', handleDesktopQuery);
        mobileQuery.addEventListener('change', handleMobileQuery);

        // 초기값 설정
        setIsDesktop(desktopQuery.matches);
        setIsMobile(mobileQuery.matches);

        return () => {
            desktopQuery.removeEventListener('change', handleDesktopQuery);
            mobileQuery.removeEventListener('change', handleMobileQuery);
        };
    }, []);

    // 로딩 중이거나 초기 상태일 때 출력할 내용
    if (isDesktop === null || isMobile === null) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {isDesktop && (
                <div className="w-full flex relative border-2 border-solid rounded-lg p-4" onClick={GoDetail}>
                    <div className="w-[95px] h-[95px] relative">
                        <Image src={productImg} alt="제품 사진" fill className="aspect-square object-cover rounded-lg w-full h-full" />
                        {isActive === true ? (
                            <AiFillHeart className="w-6 h-6 absolute left-1 bottom-1" color={'#5669FF'} onClick={ClickHeart} />
                        ) : isActive === false ? (
                            <AiOutlineHeart className="w-6 h-6 absolute left-1 bottom-1" color={'#5669FF'} onClick={ClickHeart} />
                        ) : null}
                    </div>
                    <div className="items-center pl-4 pr-1 grow">
                        <span className="font-semibold w-full flex items-center justify-between relative">
                            <p className=" truncate dark:text-black font-bolder">{title}</p>
                            {menuState !== undefined && hasReview !== true ? (
                                <>
                                    <SlOptions className="bg-[#F2F2F2] h-[1.5rem] px-[0.4rem] w-[1.5rem] rounded-[0.2rem]" color="gray" onClick={(event: React.MouseEvent) => Dropdown(event)} />
                                    <ItemCardOption
                                        productId={productId}
                                        ownerId={ownerId}
                                        isBooked={isBooked}
                                        start={startDate}
                                        end={endDate}
                                        {...{ isRent: state === '대여 받은 내역', menuState, dropdownVisible }}
                                        reservationId={reservationId}
                                    />
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
                            <p className="text-[#8E8E93] text-sm mr-2">{location}</p>{' '}
                            {isSafe !== undefined && isSafe === true ? <Image src={shield} alt="세이프존 표시" className="w-4 h-4" width={300} height={400} /> : null}
                        </span>
                        {startDate !== null && startDate !== undefined ? (
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
            )}
            {isMobile && (
                <div className="w-full flex relative border-b border-solid py-4" onClick={GoDetail}>
                    <div className="w-[95px] h-[95px] relative">
                        <Image src={productImg} alt="제품 사진" fill className="aspect-square object-cover rounded-lg w-full h-full" />
                        {isActive === true ? (
                            <AiFillHeart className="w-6 h-6 absolute left-1 bottom-1" color={'#5669FF'} onClick={ClickHeart} />
                        ) : isActive === false ? (
                            <AiOutlineHeart className="w-6 h-6 absolute left-1 bottom-1" color={'#5669FF'} onClick={ClickHeart} />
                        ) : null}
                    </div>
                    <div className="items-center pl-4 pr-1" style={{ width: containerWidth }}>
                        <span className="font-semibold w-full flex items-center justify-between relative">
                            <p className=" truncate dark:text-black font-bolder">{title}</p>
                            {menuState !== undefined && hasReview !== true ? (
                                <>
                                    <SlOptions className="bg-[#F2F2F2] h-[1.5rem] px-[0.4rem] w-[1.5rem] rounded-[0.2rem]" color="gray" onClick={(event: React.MouseEvent) => Dropdown(event)} />
                                    <ItemCardOption
                                        productId={productId}
                                        ownerId={ownerId}
                                        isBooked={isBooked}
                                        start={startDate}
                                        end={endDate}
                                        {...{ isRent: url === '/mypage/rent', menuState, dropdownVisible }}
                                        reservationId={reservationId}
                                    />
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
                            <p className="text-[#8E8E93] text-sm mr-2">{location}</p>{' '}
                            {isSafe !== undefined && isSafe === true ? <Image src={shield} alt="세이프존 표시" className="w-4 h-4" width={300} height={400} /> : null}
                        </span>
                        {startDate !== null && startDate !== undefined ? (
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
            )}
        </>
    );
}

export default ItemCard;
