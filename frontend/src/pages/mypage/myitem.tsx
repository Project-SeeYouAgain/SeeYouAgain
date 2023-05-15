import React, { useState, useEffect } from 'react';
import Container from '@/components/Container';
import Body from '@/components/Container/components/Body';
import Header from '@/components/Container/components/Header';
import Menu from '@/components/Card/Menu';
import { axBase, axAuth } from '../../apis/axiosinstance';
import Card from '../../components/Card/ItemCard';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { userState, productState } from 'recoil/user/atoms';
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
    const dragThreshold = 20;
    const refreshKey = useRecoilValue(productState).refreshKey;

    function SelectMenu(data: number) {
        setMenuState(data);
    }

    useEffect(() => {
        let url = `/product-service/auth/myproduct/${menuState}`;
        if (menuState === 3) {
            url = '/product-service/auth/myproduct/1';
        }
        axAuth(token)({ url })
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
    }, [menuState, refreshKey]);

    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const handleDragStart = (e: any) => {
        const touch = e.touches ? e.touches[0] : e;
        setDragStart({ x: touch.clientX, y: touch.clientY });
    };

    const handleDragEnd = (e: any) => {
        const touch = e.changedTouches ? e.changedTouches[0] : e;
        const deltaX = touch.clientX - dragStart.x;
        const deltaY = touch.clientY - dragStart.y;

        if (Math.abs(deltaY) > Math.abs(deltaX)) {
            // Ignore vertical drag
            return;
        }
        if (Math.abs(deltaX) < dragThreshold) {
            return;
        }

        if (deltaX > -90) {
            setMenuState(prev => (prev === 1 ? 3 : prev - 1));
        } else if (deltaX < 90) {
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
                <Menu onSelectMenu={SelectMenu} dragMenu={menuState} title1={'예약중'} title2={'대여중'} title3={'대기중'} />
                {menuState === 1 ? (
                    <div>
                        {bookList.length === 0 ? (
                            <Image src={noresult} alt={'텅 빈 상자 이미지'} className="w-[100%] h-[20rem]" />
                        ) : (
                            bookList.map((item, index) => (
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
                                    key={index}
                                />
                            ))
                        )}
                    </div>
                ) : itemList.length === 0 ? (
                    <Image src={noresult} alt={'텅 빈 상자 이미지'} className="w-[100%] h-[20rem]" />
                ) : menuState === 3 ? (
                    itemList
                        .filter(item => !item.startDate)
                        .map((item, index) => (
                            <Card
                                productImg={item.productImg}
                                title={item.title}
                                location={item.location}
                                price={item.price}
                                isSafe={item.isSafe}
                                menuState={menuState}
                                productId={item.productId}
                                isBooked={true}
                                key={index}
                            />
                        ))
                ) : (
                    itemList.map((item, index) => (
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
                            key={index}
                        />
                    ))
                )}
            </div>
        </Container>
    );
}

export default Rent;
