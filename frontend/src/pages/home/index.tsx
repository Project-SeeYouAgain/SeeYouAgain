import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../recoil/user/atoms';
import { axAuth } from '@/apis/axiosinstance';
import Container from '@/components/Container';
import MainHeader from '@/components/Container/components/MainHeader';
import Footer from '@/components/Container/components/Footer';
import ItemCard from '@/components/Card/ItemCard';
import WebItemCard from '@/components/Card/WebItemCard';
import Navbar from '@/components/Container/components/Navbar';
import { useRouter } from 'next/router';
import question from '../../images/question.png';
import Image from 'next/image';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroller';
import CategoryModal from '@/components/Modal/CategoryModal';
import styles from './index.module.scss';
import { useMediaQuery } from 'react-responsive';
import WebNavbar from '@/components/Container/components/WebNavbar';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

interface dataProps {
    thumbnailUrl: string;
    title: string;
    location: string;
    price: number;
    startDate?: string;
    endDate?: string;
    isSafe?: boolean;
    isCart: boolean;
    productId: number;
    menuState?: number;
}

interface user {
    accessToken: string | null;
    nickname: string | null;
    id: string | null;
    profileImg: string | null;
    location: string | null;
    mannerScore: string | null;
}

function Home() {
    // 물품리스트 불러오기
    const [listdata, setListData] = useState<dataProps[]>([]);
    // 찜하기
    const token = useRecoilValue(userState).accessToken;
    const [user, setUser] = useState<user>({
        accessToken: '',
        nickname: '',
        id: '',
        profileImg: '',
        location: '',
        mannerScore: '',
    });

    // 카테고리 모달
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isMyLocation, setIsMyLocation] = useState<boolean>(false);

    function handleCategory() {
        setIsModalOpen(true);
    }

    const [selectedCategoryName, setSelectedCategoryName] = useState<string>('전체');

    const handleCategorySelect = (categoryName: string) => {
        setSelectedCategoryName(categoryName);
    };

    const handleIsMyLocation = () => {
        setIsMyLocation(!isMyLocation);
    };

    const [productId, setProductId] = useState<number>();
    const [price, setPrice] = useState<number>();
    const [hasMore, setHasMore] = useState<boolean>(true);
    const router = useRouter();
    const userset = useRecoilValue(userState);
    const [sortText, setSortText] = useState<string>('정렬');
    const [sort, setSort] = useState<number>(0);

    const handleSort = (type: number, typeText: string) => {
        console.log(1);
        setSort(type);
        setSortText(typeText);
    };

    useEffect(() => {
        setUser(userset);
        axAuth(token)({
            method: 'post',
            url: '/product-service/auth/productlist',
            data: {
                sort: sort,
                productId: null,
                location: isMyLocation,
                category: selectedCategoryName,
                myLocation: user.location,
                price: null,
            },
        }).then(res => {
            const productList = res.data.data;
            setListData((_list_data: dataProps[]) => [...productList]);
            setProductId(productList[productList.length - 1]?.productId);
            setPrice(productList[productList.length - 1]?.price);

            if (productList.length < 20) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
        });
    }, [userset, selectedCategoryName, isMyLocation, sort]);

    const getProduct = () => {
        console.log(selectedCategoryName);
        console.log(isMyLocation);
        axAuth(token)({
            method: 'post',
            url: '/product-service/auth/productlist',
            data: {
                sort: sort,
                productId: productId,
                location: isMyLocation,
                category: selectedCategoryName,
                myLocation: user.location,
                price: price,
            },
        }).then(res => {
            const productList = res.data.data;
            setListData((_list_data: dataProps[]) => [..._list_data, ...productList]);
            setProductId(productList[productList.length - 1]?.productId);
            setPrice(productList[productList.length - 1]?.price);

            if (productList.length < 20) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
        });
    };

    const onClick = (id: number) => {
        router.push(`/${id}`);
    };

    const [containerHeight, setContainerHeight] = useState<number>(0);
    const [webContainerHeight, setWebContainerHeight] = useState<number>(0);

    useEffect(() => {
        const firebaseConfig = {
            apiKey: 'AIzaSyDwEsV86gH2v-5Qkm68DzJbqhByzvYuZng',
            authDomain: 'seeyouagain-d505e.firebaseapp.com',
            projectId: 'seeyouagain-d505e',
            storageBucket: 'seeyouagain-d505e.appspot.com',
            messagingSenderId: '299695008110',
            appId: '1:299695008110:web:d6f1d174384198993cb97f',
            measurementId: 'G-5JE202YV21',
        };

        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);

        if (Notification.permission !== 'granted') {
            // Chrome - 유저에게 푸시 알림을 허용하겠냐고 물어보고, 허용하지 않으면 return!
            try {
                Notification.requestPermission().then(permission => {
                    // eslint-disable-next-line no-useless-return
                    if (permission !== 'granted') return;
                });
            } catch (error) {
                // Safari - 유저에게 푸시 알림을 허용하겠냐고 물어보고, 허용하지 않으면 return!
                if (error instanceof TypeError) {
                    Notification.requestPermission().then(permission => {
                        // eslint-disable-next-line no-useless-return
                        if (permission !== 'granted') return;
                    });
                } else {
                    console.error(error);
                }
            }
        }

        console.log('권한 요청 중...');

        Notification.requestPermission().then(permission => {
            if (permission === 'denied') {
                console.log('알림 권한 허용 안됨');
                return;
            }
            // 권한이 'granted'인 경우의 처리
        });

        console.log('알림 권한이 허용됨');

        const fcmToken = getToken(messaging, {
            vapidKey: 'BOxHR5SEepMdoj1-Zuy-qJC-S5SABE3eIZ_-e66-GDXjspEDsguTUG69NMz--8wDrTlZk3qiPzlfAhzs8viWEIo',
        }).then(res => {
            axAuth(token)({
                method: 'patch',
                url: '/user-service/auth/firebase-token',
                data: {
                    firebaseToken: res,
                },
            });
        });

        onMessage(messaging, payload => {
            console.log('메시지가 도착했습니다.', payload);
            // ...
        });

        const handleResize = () => {
            const windowHeight = window.innerHeight;
            const containerHeight = windowHeight - 247.2;
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
    useEffect(() => {
        const handleResize = () => {
            const windowHeight = window.innerHeight;
            const containerHeight = windowHeight - 100;
            setWebContainerHeight(containerHeight);
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
        <>
            {isDesktop && (
                <div className="w-full">
                    <WebNavbar />
                    <div className="mt-[100px] px-[10rem]" style={{ minHeight: webContainerHeight }}>
                        <div className="py-6 text-2xl font-bold">
                            <p className="text-blue">필요한 물건을 찾고 나눠요.</p>
                            <p>이웃들이 공유한 물건</p>
                        </div>
                        <div className="grid grid-cols-4 gap-6 mb-8">
                            {listdata &&
                                listdata.map((item, index) => (
                                    <div onClick={() => onClick(item.productId)} key={index}>
                                        <WebItemCard productId={item.productId} productImg={item.thumbnailUrl} location={item.location} price={item.price} title={item.title} />
                                    </div>
                                ))}
                        </div>
                    </div>
                    <Footer />
                </div>
            )}
            {isMobile && (
                <Container>
                    <CategoryModal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCategorySelect={handleCategorySelect} />
                    <div className="h-screen overflow-auto mb-[3.7rem]">
                        <InfiniteScroll initialLoad={false} loadMore={getProduct} hasMore={hasMore} isReverse={false} useWindow={false} threshold={50}>
                            <MainHeader title1="우리 동네에서" title2="찾고 나눠요" />
                            <div className="px-5 ">
                                {/* 이용자 안내 페이지 */}
                                <Link href="/tutorial">
                                    <div className="relative flex justify-between w-[100%] h-[5rem] bg-blue rounded-[.7rem] items-center px-2 ">
                                        <div className="ml-[2vw]">
                                            <p className="text-white font-semibold text-[1.5rem]">씨유어게인,</p>
                                            <p className="text-white">사용법이 궁금하세요?</p>
                                        </div>
                                        <Image src={question} alt="qmark" className="w-[5rem]" />
                                    </div>
                                </Link>

                                <div className="relative" style={{ height: containerHeight }}>
                                    {/* 정렬 */}
                                    <div className="flex justify-end my-4">
                                        {/* 카테고리 */}

                                        <button
                                            className={`rounded-full p-2 px-3 mx-1 border border-solid text-sm text-darkgrey ${selectedCategoryName === '전체' ? 'bg-white' : 'bg-blue text-white'}`}
                                            onClick={handleCategory}
                                        >
                                            카테고리 선택
                                        </button>
                                        {/* 동네 */}
                                        <button
                                            className={`rounded-full p-2 px-3 mx-1 border border-solid text-sm text-darkgrey ${isMyLocation ? 'bg-blue text-white' : 'bg-white'}`}
                                            onClick={handleIsMyLocation}
                                        >
                                            내 동네만 보기
                                        </button>
                                        {/* 정렬 */}
                                        <select
                                            name="sort"
                                            className={`rounded-full p-2 px-3 mx-1 text-center border border-solid text-sm text-darkgrey ${styles.sort} ${
                                                sortText === '정렬' ? 'bg-white' : 'bg-blue text-white'
                                            }`}
                                            onChange={event => handleSort(Number(event.target.value), event.target.options[event.target.selectedIndex].text)}
                                        >
                                            <option value="" disabled selected>
                                                정렬
                                            </option>
                                            <option value="0">최신순</option>
                                            <option value="1">가격순</option>
                                        </select>
                                    </div>
                                    {/* 제품 목록 */}
                                    {listdata &&
                                        listdata.map((item, index) => (
                                            <div onClick={() => onClick(item.productId)} key={index}>
                                                <ItemCard
                                                    productId={item.productId}
                                                    productImg={item.thumbnailUrl}
                                                    location={item.location}
                                                    price={item.price}
                                                    title={item.title}
                                                    isCart={item.isCart}
                                                    isSafe={item.isSafe}
                                                />
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </InfiniteScroll>
                    </div>

                    <Navbar />
                </Container>
            )}
        </>
    );
}

export default Home;
