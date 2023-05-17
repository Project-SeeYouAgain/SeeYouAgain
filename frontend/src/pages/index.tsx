import React, { useEffect } from 'react';
import Web from '../components/main/Web/index';
import Mobile from '../components/main/Mobile/index';
import { useWindowSize } from '../components/hooks/useWindowSize';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user/atoms';
import { useRouter } from 'next/router';

export default function index() {
    const { width } = useWindowSize();
    const isMobile = width && width <= 768;
    const token = useRecoilValue(userState).accessToken;
    const router = useRouter();
    useEffect(() => {
        if (token) {
            router.push('/home');
        }
    }, [token]);
    return <div>{isMobile ? <Mobile /> : <Web />}</div>;
}
// test
