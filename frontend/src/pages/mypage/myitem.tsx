import React, { useState, useEffect } from 'react';
import Container from '@/components/Container';
import Body from '@/components/Container/components/Body';
import Header from '@/components/Container/components/Header';
import Menu from '@/components/Card/Menu';
import { axBase } from '../../apis/axiosinstance';
import Card from '../../components/Card/ItemCard';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user/atoms';
import noresult from '@/images/no-results.png';
import Image from 'next/image';

function Rent() {
    interface RentalItem {
        productImg: string;
        title: string;
        location: string;
        price: number;
        startDate: string;
        endDate: string;
        isSafe?: boolean;
        isCart?: boolean;
        productId: number;
        isHide: boolean;
    }
    const [menuState, setMenuState] = useState<number>(1);
    const [itemList, setItemList] = useState<RentalItem[]>([]);
    const token = useRecoilValue(userState).accessToken;
    const [len, setLen] = useState<number>(0);
    const [bookList, setBookList] = useState<RentalItem[]>([]);

    function SelectMenu(data: number) {
        setMenuState(data);
    }

    useEffect(() => {
        const url = `/product-service/auth/myproduct/${menuState}`;
        axBase(token)({ url })
            .then(res => {
                console.log(res.data.data);
                setItemList(res.data.data);
                setLen(res.data.data.filter((item: RentalItem) => !item.startDate && !item.isHide).length);
                const BookItems = res.data.data.filter((item: RentalItem) => {
                    return item.startDate && !item.isHide;
                });
                setBookList(BookItems);
            })
            .catch(err => console.log(err));
    }, [menuState]);

    return (
        <Container>
            <Header title="내 아이템"></Header>
            <Body>
                <Menu onSelectMenu={SelectMenu} dragMenu={menuState} title1={'대기 목록'} title2={'대여중'} title3={'숨김'} />
                {menuState === 1 ? (
                    <div>
                        <h2>예약중</h2>
                        {bookList.length === 0 ? (
                            <Image src={noresult} alt={'텅 빈 상자 이미지'} className="w-[100%] h-[20rem]" />
                        ) : (
                            bookList.map((item, index) => (
                                <Link key={index} href={''}>
                                    <Card
                                        productImg={item.productImg}
                                        title={item.title}
                                        location={item.location}
                                        price={item.price}
                                        startDate={item.startDate}
                                        endDate={item.endDate}
                                        isSafe={item.isSafe}
                                        menuState={menuState}
                                        productId={item.productId}
                                        isBooked={true}
                                    />
                                </Link>
                            ))
                        )}
                        <h2>대기중</h2>
                        {itemList.length === 0 || len === 0 ? (
                            <Image src={noresult} alt={'텅 빈 상자 이미지'} className="w-[100%] h-[20rem]" />
                        ) : (
                            itemList
                                .filter(item => !item.startDate)
                                .map((item, index) => (
                                    <Link key={index} href={''}>
                                        <Card
                                            productImg={item.productImg}
                                            title={item.title}
                                            location={item.location}
                                            price={item.price}
                                            startDate={item.startDate}
                                            endDate={item.endDate}
                                            isSafe={item.isSafe}
                                            menuState={menuState}
                                            productId={item.productId}
                                            isBooked={false}
                                        />
                                    </Link>
                                ))
                        )}
                    </div>
                ) : itemList.length === 0 ? (
                    <Image src={noresult} alt={'텅 빈 상자 이미지'} className="w-[100%] h-[20rem]" />
                ) : (
                    itemList.map((item, index) => (
                        <Link key={index} href={''}>
                            <Card
                                productImg={item.productImg}
                                title={item.title}
                                location={item.location}
                                price={item.price}
                                startDate={item.startDate}
                                endDate={item.endDate}
                                isSafe={item.isSafe}
                                menuState={menuState}
                                productId={item.productId}
                            />
                        </Link>
                    ))
                )}
            </Body>
        </Container>
    );
}

export default Rent;
