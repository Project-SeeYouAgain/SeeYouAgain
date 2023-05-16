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
                <div id="tuto_top" className="mb-8">
                    <Image src={logo} alt="logo" width={80} className="m-auto mt-4" />
                    <div className="font-NanumNeo font-bold mt-5">
                        <p className="text-center"> 더 풍요로운 동네 생활을 만드는 </p>
                        <p className="text-center"> 씨유어게인, 어떻게 이용할까요? </p>
                    </div>
                </div>
                <div className="grid grid-cols-[1fr,3fr] -m-1">
                    <div className=" h-20 rounded-xl bg-blue text-white text-center text-lg py-6 font-NanumNeo font-bold"> 구해요 </div>
                    <div className=" h-20 rounded-xl bg-blue text-white text-center text-lg py-3 font-NanumNeo ">
                        <div>
                            <p>하이</p>
                            <p>하이</p>
                        </div>
                    </div>
                </div>
            </Body>
        </Container>
    );
}

export default Tutorial;
