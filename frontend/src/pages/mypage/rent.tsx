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

    return (
        <Container>
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
        </Container>
    );
}

export default Rent;
