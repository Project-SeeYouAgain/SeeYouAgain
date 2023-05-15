import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../recoil/user/atoms';
import { axAuth } from '@/apis/axiosinstance';
import Container from '@/components/Container';
import MainHeader from '@/components/Container/components/MainHeader';
import ItemCard from '@/components/Card/ItemCard';
import Navbar from '@/components/Container/components/Navbar';
import { useRouter } from 'next/router';
import question from '../../images/question.png';
import Image from 'next/image';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroller';
import CategoryModal from '@/components/Modal/CategoryModal';
import styles from './index.module.scss';

interface dataProps {
    thumbnailUrl: string;
    title: string;
    location: string;
    price: number;
    startDate?: string;
    endDate?: string;
    isSafe?: boolean;
    isCart?: boolean;
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
            },
        }).then(res => {
            const productList = res.data.data;
            setListData((_list_data: dataProps[]) => [...productList]);
            setProductId(productList[productList.length - 1]?.productId);

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
            },
        }).then(res => {
            const productList = res.data.data;
            setListData((_list_data: dataProps[]) => [..._list_data, ...productList]);
            setProductId(productList[productList.length - 1]?.productId);

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

    useEffect(() => {
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

    return (
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
                                    className={`rounded-full p-2 px-3 mx-1 text-center border border-solid text-sm text-darkgrey ${styles.sort} ${sortText === '정렬' ? 'bg-white' : 'bg-blue text-white'}`}
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
                                        <ItemCard productId={item.productId} productImg={item.thumbnailUrl} location={item.location} price={item.price} title={item.title} isSafe={item.isSafe} />
                                    </div>
                                ))}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>

            <Navbar />
        </Container>
    );
}

export default Home;
