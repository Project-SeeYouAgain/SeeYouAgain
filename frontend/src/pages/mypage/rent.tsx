import React, { useState, useEffect } from 'react';
import Container from '@/components/Container';
import Body from '@/components/Container/components/Body';
import Header from '@/components/Container/components/Header';
import Menu from '@/components/Card/Menu';
import { axBase } from '../../apis/axiosinstance';
import Card from '../../components/Card/ItemCard';
import Link from 'next/link';
import axios, { AxiosInstance } from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState, productState } from 'recoil/user/atoms';
import noresult from '@/images/no-results.png';
import Image from 'next/image';

function Rent() {
    interface RentalItem {
        productImg: string;
        title: string;
        location: string;
        price: number;
        startDate?: string;
        endDate?: string;
        isSafe?: boolean;
        isCart: boolean;
        menuState: number;
        productId: number;
        ownerId: number;
        reservationId: number;
        hasReview: boolean;
    }
    const [menuState, setMenuState] = useState<number>(1);
    const [itemList, setItemList] = useState<RentalItem[]>([]);
    const token = useRecoilValue(userState).accessToken;
    const refreshKey = useRecoilValue(productState).refreshKey;

    function SelectMenu(data: number) {
        setMenuState(data);
    }

    useEffect(() => {
        const url = `/product-service/auth/reservation/${menuState}`;
        axBase(token)({ url })
            .then(res => {
                console.log(res.data.data);
                setItemList(res.data.data);
            })
            .catch(err => console.log(err));
    }, [menuState, refreshKey]);

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
        <Container>
            {isDesktop && (
                <>
                    <div className="w-full mb-4 text-2xl font-bold pb-4">
                        <p className="pl-4">대여 받은 내역</p>
                    </div>
                    <div>
                        <Menu onSelectMenu={SelectMenu} dragMenu={1} title1={'대여중'} title2={'예약중'} title3={'반납완료'} />

                        {itemList.length !== 0 ? (
                            <div className="grid grid-cols-2 gap-4">
                                {itemList.map((item, index) => (
                                    <Link key={index} href={''}>
                                        <Card
                                            productImg={item.productImg}
                                            title={item.title}
                                            location={item.location}
                                            price={item.price}
                                            startDate={item.startDate}
                                            endDate={item.endDate}
                                            isCart={item.isCart}
                                            isSafe={item.isSafe}
                                            menuState={menuState}
                                            productId={item.productId}
                                            ownerId={item.ownerId}
                                        />
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <Image src={noresult} alt={'텅 빈 상자 이미지'} className="w-1/3 h-1/3 m-auto" />
                        )}
                    </div>
                </>
            )}
            {isMobile && (
                <>
                    <Header title="대여 받은 내역"></Header>
                    <Body>
                        <Menu onSelectMenu={SelectMenu} dragMenu={1} title1={'대여중'} title2={'예약중'} title3={'반납완료'} />
                        {itemList.length !== 0 ? (
                            itemList.map((item, index) => (
                                <Card
                                    productImg={item.productImg}
                                    title={item.title}
                                    location={item.location}
                                    price={item.price}
                                    startDate={item.startDate}
                                    endDate={item.endDate}
                                    isCart={item.isCart}
                                    isSafe={item.isSafe}
                                    menuState={menuState}
                                    productId={item.productId}
                                    ownerId={item.ownerId}
                                    key={index}
                                />
                            ))
                        ) : (
                            <Image src={noresult} alt={'텅 빈 상자 이미지'} className="w-[100%] h-[20rem]" />
                        )}
                    </Body>
                </>
            )}
        </Container>
    );
}

export default Rent;
