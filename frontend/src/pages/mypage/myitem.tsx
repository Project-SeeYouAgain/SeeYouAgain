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

function MyItem() {
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
    }
    const [menuState, setMenuState] = useState<number>(1);
    const [itemList, setItemList] = useState<RentalItem[]>([]);
    const token = useRecoilValue(userState).accessToken;
    const [bookList, setBookList] = useState<RentalItem[]>([]);
    const [holdList, setHoldList] = useState<RentalItem[]>([]);
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
                const today = new Date();
                const BookItems = res.data.data.filter((item: RentalItem) => {
                    const startDate = new Date(item.startDate);
                    const endDate = new Date(item.endDate);
                    return startDate > today;
                });
                setBookList(BookItems);
                const HoldItems = res.data.data.filter((item: RentalItem) => {
                    return item.startDate === null;
                });
                setHoldList(HoldItems);
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
                        <p className="pl-4">내 아이템</p>
                    </div>
                    <div className="px-[1.88rem]" style={{ height: containerHeight }} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onTouchStart={handleDragStart} onTouchEnd={handleDragEnd}>
                        <Menu onSelectMenu={SelectMenu} dragMenu={menuState} title1={'예약중'} title2={'대여중'} title3={'대기중'} />
                        {menuState === 1 ? (
                            <div>
                                {bookList.length === 0 ? (
                                    <Image src={noresult} alt={'텅 빈 상자 이미지'} className="w-1/3 h-1/3 m-auto" />
                                ) : (
                                    <div className="grid grid-cols-2 gap-4">
                                        {bookList.map((item, index) => (
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
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : menuState === 2 ? (
                            <div>
                                {itemList.length === 0 ? (
                                    <Image src={noresult} alt={'텅 빈 상자 이미지'} className="w-1/3 h-1/3 m-auto" />
                                ) : (
                                    <div className="grid grid-cols-2 gap-4">
                                        {itemList.map((item, index) => (
                                            <Link key={index} href={''}>
                                                <Card
                                                    productImg={item.productImg}
                                                    title={item.title}
                                                    location={item.location}
                                                    price={item.price}
                                                    isSafe={item.isSafe}
                                                    menuState={menuState}
                                                    productId={item.productId}
                                                    isBooked={true}
                                                    startDate={item.startDate}
                                                    endDate={item.endDate}
                                                />
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>
                                {holdList.length === 0 ? (
                                    <Image src={noresult} alt={'텅 빈 상자 이미지'} className="w-1/3 h-1/3 m-auto" />
                                ) : (
                                    <div className="grid grid-cols-2 gap-4">
                                        {holdList.map((item, index) => (
                                            <Link key={index} href={''}>
                                                <Card
                                                    productImg={item.productImg}
                                                    title={item.title}
                                                    location={item.location}
                                                    price={item.price}
                                                    isSafe={item.isSafe}
                                                    menuState={menuState}
                                                    productId={item.productId}
                                                    isBooked={true}
                                                />
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}
            {isMobile && (
                <>
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
                        ) : menuState === 2 ? (
                            itemList.length === 0 ? (
                                <Image src={noresult} alt={'텅 빈 상자 이미지'} className="w-[100%] h-[20rem]" />
                            ) : (
                                itemList.map((item, index) => (
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
                                        startDate={item.startDate}
                                        endDate={item.endDate}
                                    />
                                ))
                            )
                        ) : holdList.length === 0 ? (
                            <Image src={noresult} alt={'텅 빈 상자 이미지'} className="w-[100%] h-[20rem]" />
                        ) : (
                            holdList.map((item, index) => (
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
                        )}
                    </div>
                </>
            )}
        </Container>
    );
}

export default MyItem;
