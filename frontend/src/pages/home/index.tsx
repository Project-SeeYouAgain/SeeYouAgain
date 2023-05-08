import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../../../recoil/user/atoms';
import { useRouter } from 'next/router';

// home : 만약 쿠키 값에 usernickname이 있다면 회원이므로 그대로 존재
// check : 쿠키 값에 nickname이 없으면 check페이지로 이동시켜 회원 가입 시킴
function Home() {
    const router = useRouter();
    const [userData, setUserData] = useRecoilState<UserState>(userState);
    const [isUser, setIsUser] = useState<boolean>(false);
    const user = useRecoilValue(userState);
    useEffect(() => {
        const accessToken = getCookie('accessToken');
        const nickname = getCookie('nickname');
        if (nickname === '') {
            router.push('/check');
        } else {
            if (accessToken !== undefined) {
                setUserData(prev => ({ ...prev, accessToken }));
            }
            if (nickname !== undefined) {
                setUserData(prev => ({ ...prev, nickname }));
            }
            setIsUser(true);
        }
    }, []);
    function getCookie(name: string) {
        const cookie = document.cookie;
        const matches = cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    return isUser ? (
        <div>
            메인 페이지
            <div>{user.nickname}</div>
        </div>
    ) : null;
}

export default Home;
