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

    const [dragStart, setDragStart] = useState(0);

    const handleDragStart = (e: any) => {
        const touch = e.touches ? e.touches[0] : e;
        setDragStart(touch.clientX);
    };

    const handleDragEnd = (e: any) => {
        const touch = e.changedTouches ? e.changedTouches[0] : e;
        const delta = touch.clientX - dragStart;

        if (delta > -40) {
            setMenuState(prev => (prev === 1 ? 3 : prev - 1));
        } else if (delta < 40) {
            setMenuState(prev => (prev === 3 ? 1 : prev + 1));
        }
    };
    const [containerHeight, setContainerHeight] = useState<number>(0);

    useEffect(() => {
        const handleResize = () => {
            const windowHeight = window.innerHeight;
            console.log(windowHeight);
            const containerHeight = windowHeight - 56;
            setContainerHeight(containerHeight);
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
        <Container>
            <Header title="내 아이템"></Header>
            <div className="px-[1.88rem]" style={{ height: containerHeight }} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onTouchStart={handleDragStart} onTouchEnd={handleDragEnd}>
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
            </div>
        </Container>
    );
}

export default Rent;
