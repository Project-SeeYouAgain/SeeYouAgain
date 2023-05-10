import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../../../recoil/user/atoms';
import { useRouter } from 'next/router';
import { recoilPersist } from 'recoil-persist';

function Redirect() {
    const cookie = new Cookies();
    const router = useRouter();
    const [userData, setUserData] = useRecoilState<UserState>(userState);
    const user = useRecoilValue(userState);

    useEffect(() => {
        const accessToken = cookie.get('accessToken');
        const nickname = cookie.get('nickname');
        const id = cookie.get('userId');
        const profileImg = cookie.get('profileImg');
        const location = cookie.get('location');
        const mannerScore = cookie.get('mannerScore');
        setUserData(prev => ({ ...prev, accessToken, id, profileImg, location, mannerScore }));

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
