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
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from 'recoil/user/atoms';

function Cart() {
    interface RentalItem {
        productId: number;
        type: boolean;
        // true가 빌려줘요
        title: string;
        price: number;
        location: string;
        score: number;
        productImg: string;
        isSafe: boolean;
    }
    const [itemList, setItemList] = useState<RentalItem[]>([]);
    const token = useRecoilValue(userState).accessToken;

    useEffect(() => {
        const url = `/product-service/auth/cart`;
        axBase(token)({ url })
            .then(res => {
                setItemList(res.data.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <Container>
            <Header title="찜 목록"></Header>
            <Body>
                <div className="border-b mt-[5rem]"></div>
                {itemList.length === 0 ? (
                    <Image src={noresult} alt={'텅 빈 상자 이미지'} className="w-[100%] h-[20rem]" />
                ) : (
                    itemList.map((item, index) => (
                        <Link key={index} href={''}>
                            <Card productImg={item.productImg} title={item.title} location={item.location} price={item.price} isSafe={item.isSafe} />
                        </Link>
                    ))
                )}
            </Body>
        </Container>
    );
}

export default Cart;
