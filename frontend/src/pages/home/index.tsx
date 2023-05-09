import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../recoil/user/atoms';
import { axAuth } from '@/apis/axiosinstance';
import Container from '@/components/Container';
import Body from '@/components/Container/components/Body';
import MainHeader from '@/components/Container/components/MainHeader';

function Home() {
    const user = useRecoilValue(userState);
    useEffect(() => {
        // const productSearchCondition = {
        //     sort: 0,
        // };
        axAuth({
            method: 'post',
            url: '/product-service/auth/productlist',
            data: {
                sort: 0,
            },
        })
            .then(res => {
                console.log(res);
                // setData(res.data.data);
            })
            .catch(err => console.log(err));
    }, []);

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
                <div></div>
            </Body>
        </Container>
    );
}

export default Home;
