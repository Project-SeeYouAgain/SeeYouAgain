import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../../../recoil/user/atoms';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { axAuth } from '@/apis/axiosinstance';
import Container from '@/components/Container';
import Body from '@/components/Container/components/Body';
import MainHeader from '@/components/Container/components/MainHeader';
import ItemCard from '@/components/Card/ItemCard';
import Navbar from '@/components/Container/components/Navbar';
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
function Home() {
    const cookie = new Cookies();
    const router = useRouter();
    // 이용자 로그인 여부 및 로그인
    const [userData, setUserData] = useRecoilState<UserState>(userState);
    const user = useRecoilValue(userState);
    // 물품리스트 불러오기
    const [listdata, setListData] = useState<dataProps[]>();
    // 찜하기
    const [like, setLike] = useState<boolean>(false);

    useEffect(() => {
        const accessToken = getCookie('accessToken');
        const nickname = getCookie('nickname');
        if (nickname === '') {
            router.push('/check');
        }
        if (accessToken !== undefined) {
            setUserData(prev => ({ ...prev, accessToken }));
        }
        if (nickname !== undefined) {
            setUserData(prev => ({ ...prev, nickname }));
        }

        axAuth({
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
    }, []);

    function getCookie(name: string) {
        console.log(cookie.get('accessToken'));
        const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    return (
        <Container>
            <MainHeader title1="우리 동네에서" title2="찾고 나눠요" />
            <Body>
                {/* 이용자 안내 페이지 */}
                <div className="w-[100%] h-[4.5rem] bg-blue rounded-[.7rem]"></div>
                <div>{user.nickname}</div>
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
                <div className="mt-[3rem]">
                    <div>
                        {listdata &&
                            listdata.map(item => (
                                <div className="mb-[1rem]">
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
