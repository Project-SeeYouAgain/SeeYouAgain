import Container from '@/components/Container';
import CloseHeader from '@/components/Container/components/CloseHeader';
import { useRouter } from 'next/router';
import logo from '@/images/logo.png';

import React from 'react';
import Image from 'next/image';
import Body from '@/components/Container/components/Body';

function Tutorial() {
    const router = useRouter();
    function onclose() {
        router.back();
    }

    return (
        <Container>
            <div className="border-b">
                <CloseHeader title="씨유어게인 사용법" onClose={onclose}></CloseHeader>
            </div>
            <Body>
                <div className="">
                    <Image src={logo} alt="logo" width={80} className="m-auto mt-4" />
                    <div className="font-NanumNeo mt-1">
                        <p className="text-center"> 더 풍요로운 생활을 만드는 </p>
                        <p className="text-center"> 씨유어게인, 어떻게 쓰면 될까요? </p>
                    </div>
                </div>
            </Body>
        </Container>
    );
}

export default Tutorial;
