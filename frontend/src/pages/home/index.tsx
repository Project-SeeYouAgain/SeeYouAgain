import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../recoil/user/atoms';
import { axAuth } from '@/apis/axiosinstance';
import Container from '@/components/Container';
import Body from '@/components/Container/components/Body';
import MainHeader from '@/components/Container/components/MainHeader';
import ItemCard from '@/components/Card/ItemCard';
import Navbar from '@/components/Container/components/Navbar';
import { useRouter } from 'next/router';
import question from '../../images/question.png';
import Image from 'next/image';
import Link from 'next/link';

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
    const chw = {
        isCart: false,
        location: '화정동',
        price: 1000,
        productId: 11,
        score: 0,
        state: true,
        thumbnailUrl: 'https://seeyouagain-s3-bucket.s3.ap-northeast-2.amazonaws.com/product/ca5410a0-c8d4-407f-b8a0-fa938bdfcda0-%EC%8B%B8%EC%9D%B8.png',
        title: '고양이를 볼수있는 컵을 빌려드려욬ㅋㅋ',
        type: true,
        startDate: '22.02.02',
        endDate: '22.02.02',
    };
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
    const [productId, setProductId] = useState<number>();
    const router = useRouter();
    const userset = useRecoilValue(userState);
    useEffect(() => {
        setUser(userset);
        axAuth(token)({
            method: 'post',
            url: '/product-service/auth/productlist',
            data: {
                sort: 0,
                productId: null,
            },
        })
            .then(res => {
                console.log(res.data.data);
                const productList = res.data.data;
                setListData((_list_data: dataProps[]) => [..._list_data, ...productList]);
                setProductId(productList[productList.length - 1].productId);
            })
            .catch(err => console.log(err));
    }, [userset]);

    const getProduct = () => {
        axAuth(token)({
            method: 'post',
            url: '/product-service/auth/productlist',
            data: {
                sort: 0,
                productId: productId,
            },
        }).then(res => {
            setListData((_list_data: dataProps[]) => [..._list_data, ...res.data.data]);
        });
    };

    const onClick = (id: number) => {
        router.push(`/${id}`);
    };

    return (
        <Container>
            <MainHeader title1="우리 동네에서" title2="찾고 나눠요" />
            <div className="px-5">
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
                {/* <div>{user.nickname}</div> */}
                {/* 정렬 */}
                <div>
                    {/* 카테고리 */}
                    <div></div>
                    {/* 동네 */}
                    <div></div>
                    {/* 정렬 */}
                    <div></div>
                </div>
                {/* 제품 목록 */}
                <div className="mt-[3rem] pb-20">
                    <div>
                        <ItemCard productId={chw.productId} productImg={chw.thumbnailUrl} location={chw.location} price={chw.price} title={chw.title} isSafe={true} isCart={true} />
                        <ItemCard
                            startDate={chw.startDate}
                            endDate={chw.endDate}
                            productId={chw.productId}
                            productImg={chw.thumbnailUrl}
                            location={chw.location}
                            price={chw.price}
                            title={chw.title}
                            isSafe={true}
                            isCart={true}
                        />
                        {listdata &&
                            listdata.map((item, index) => (
                                <div onClick={() => onClick(item.productId)} key={index}>
                                    <ItemCard productId={item.productId} productImg={item.thumbnailUrl} location={item.location} price={item.price} title={item.title} />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <Navbar />
        </Container>
    );
}

export default Home;
