import React, { useState, useEffect } from 'react';
import Container from '@/components/Container';
import Body from '@/components/Container/components/Body';
import Header from '@/components/Container/components/Header';
import { axBase } from '../../apis/axiosinstance';
import Card from '../../components/Card/ItemCard';
import Link from 'next/link';
import Image from 'next/image';
import noresult from '@/images/no-results.png';
import axios, { AxiosInstance } from 'axios';
import { useRecoilValue } from 'recoil';
import { userState, productState } from 'recoil/user/atoms';

function Cart() {
    interface RentalItem {
        productId: number;
        type: boolean;
        title: string;
        price: number;
        location: string;
        score: number;
        productImg: string;
        isSafe: boolean;
    }
    const [itemList, setItemList] = useState<RentalItem[]>([]);
    const token = useRecoilValue(userState).accessToken;
    const isCart = true;
    const refreshKey = useRecoilValue(productState).refreshKey;

    useEffect(() => {
        const url = `/product-service/auth/cart`;
        axBase(token)({ url })
            .then(res => {
                setItemList(res.data.data);
            })
            .catch(err => console.log(err));
    }, [refreshKey]);

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
                    <div className="w-full mb-4 text-2xl font-bold pb-4 border-b-2 border-solid">
                        <p className="pl-4">찜 목록</p>
                    </div>
                    {itemList.length === 0 ? (
                        <>
                            <Image src={noresult} alt={'텅 빈 상자 이미지'} className="w-1/3 h-1/3 m-auto" />
                            <p className="text-center text-2xl font-bold">찜 목록이 없습니다.</p>
                        </>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            {itemList.map((item, index) => (
                                <Card
                                    productImg={item.productImg}
                                    title={item.title}
                                    location={item.location}
                                    price={item.price}
                                    isSafe={item.isSafe}
                                    productId={item.productId}
                                    isCart={isCart}
                                    key={`${index}${item.productId}`}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
            {isMobile && (
                <>
                    <Header title="찜 목록"></Header>
                    <Body>
                        <div className="border-b mt-[5rem]"></div>
                        {itemList.length === 0 ? (
                            <>
                                <Image src={noresult} alt={'텅 빈 상자 이미지'} className="w-[100%] h-[20rem]" />
                                <p className="text-center text-xl font-bold">찜 목록이 없습니다.</p>
                            </>
                        ) : (
                            itemList.map((item, index) => (
                                <Card
                                    productImg={item.productImg}
                                    title={item.title}
                                    location={item.location}
                                    price={item.price}
                                    isSafe={item.isSafe}
                                    productId={item.productId}
                                    isCart={isCart}
                                    key={item.productId}
                                />
                            ))
                        )}
                    </Body>
                </>
            )}
        </Container>
    );
}

export default Cart;
