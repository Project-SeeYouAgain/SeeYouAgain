import React from 'react';
import logo from '@/images/logo.png';
import Image from 'next/image';

function index() {
    return (
        <div className="w-full flex bg-blue h-[160px] p-[30px] px-[5rem]">
            <Image src={logo} alt="logo" className="w-[100px] h-[100px]" />
            <div className="ml-4 flex items-center">
                <div className="h-fit text-white">
                    <div className="flex items-center mb-2">
                        <p className="pr-2 border-r-2 border-solid">이용약관</p>
                        <p className="pl-2">개인정보처리방침</p>
                    </div>
                    <p>본 사이트의 콘텐츠는 저작권법의 보호를 받는 바 무단 전재, 복사, 배포 등을 금합니다.</p>
                    <p>Copyright © SeeYouAgain All Rights Reserved.</p>
                </div>
            </div>
        </div>
    );
}

export default index;
