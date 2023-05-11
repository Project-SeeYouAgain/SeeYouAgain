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
    const [listdata, setListData] = useState<dataProps[]>();
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
    const router = useRouter();
    const userset = useRecoilValue(userState);
    useEffect(() => {
        setUser(userset);
        axAuth(token)({
            method: 'post',
            url: '/product-service/auth/productlist',
            data: {
                sort: 0,
            },
        })
            .then(res => {
                console.log(res.data.data);
                setListData(res.data.data);
            })
            .catch(err => console.log(err));
    }, [userset]);

    const onClick = (id: number) => {
        router.push(`/${id}`);
    };

    return (
        <Container>
            <MainHeader title1="우리 동네에서" title2="찾고 나눠요" />
            <Body>
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
                <div className="mt-[3rem] ">
                    <div>
                        {listdata &&
                            listdata.map((item, index) => (
                                <div className="mb-[1rem]" onClick={() => onClick(item.productId)} key={index}>
                                    <ItemCard productId={item.productId} productImg={item.thumbnailUrl} location={item.location} price={item.price} title={item.title} />
                                </div>
                            ))}
                    </div>
                </div>
            </Body>
            <Navbar />
        </Container>
    );
}

export default Home;
