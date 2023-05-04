import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../../../recoil/user/atoms';
import { useRouter } from 'next/router';

function Home() {
    const router = useRouter();
    const [userData, setUserData] = useRecoilState<UserState>(userState);
    const user = useRecoilValue(userState);
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

    }, []);
    function getCookie(name: string) {
        const cookie = document.cookie;
        const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    return (
        <div>
            메인 페이지
            <div>{user.nickname}</div>
        </div>
    );
}

export default Home;
