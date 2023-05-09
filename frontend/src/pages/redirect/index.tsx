import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../../../recoil/user/atoms';
import { useRouter } from 'next/router';

function Redirect() {
    const cookie = new Cookies();
    const router = useRouter();
    const [userData, setUserData] = useRecoilState<UserState>(userState);
    const user = useRecoilValue(userState);

    useEffect(() => {
        const accessToken = cookie.get('accessToken');
        const nickname = cookie.get('nickname');

        setUserData(prev => ({ ...prev, accessToken }));

        if (nickname === '') {
            router.push('/check');
        } else {
            setUserData(prev => ({ ...prev, nickname }));

            router.push('/home');
        }
    }, []);

    return <div></div>;
}

export default Redirect;
