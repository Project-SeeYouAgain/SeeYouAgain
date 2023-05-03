// settings.tsx
import SquareLg from '@/components/Button/SquareLg';
import Container from '@/components/Container';
import Body from '@/components/Container/components/Body';
import Header from '@/components/Container/components/Header';
import ProfileImage from '@/components/UserAvatar';
import defaultUserImage from '@/images/default_user.png';
import pen from '@/images/pen.png';
import Image from 'next/image';

import React, { useState } from 'react';

function settings() {
    const [firstValue, setFirstValue] = useState<string>('');
    const [secondValue, setSecondValue] = useState<string>('');
    const [thirdValue, setThirdValue] = useState<string>('');

    const changeFirstValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstValue(event.target.value);
    };

    const changeSecondValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSecondValue(event.target.value);
    };

    const changeThirdValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setThirdValue(event.target.value);
    };
    return (
        <Container className="relative">
            <Header title="프로필 수정"></Header>
            <Body>
                <ProfileImage defaultImage={defaultUserImage} />
                <div className="mt-4">
                    <p className="m-1 font-bol">닉네임</p>
                    <div className="flex items-center bg-gray-200 p-2 rounded-xl">
                        <input type="text" className="w-[95%] bg-transparent" value={firstValue} onChange={changeFirstValue} />
                        <Image src={pen} alt="pen" className="m-1 h-3 w-3" />
                    </div>
                </div>
                <div className="mt-4">
                    <p className="m-1 font-bol">동네설정</p>
                    <div className="flex items-center bg-gray-200 p-2 rounded-xl">
                        <input type="text" className="w-[95%] bg-transparent" value={secondValue} onChange={changeSecondValue} />
                        <Image src={pen} alt="pen" className="m-1 h-3 w-3" />
                    </div>
                </div>
                <div className="mt-4">
                    <p className="m-1 font-bol">소개 메세지</p>
                    <div className="flex bg-gray-200 p-2 rounded-xl">
                        <textarea className="w-[95%] bg-transparent" value={thirdValue} onChange={changeThirdValue} />
                        <Image src={pen} alt="pen" className="m-1 h-3 w-3" />
                    </div>
                </div>
            </Body>
            <SquareLg divClass="absolute bottom-1 w-full px-[1.88rem]" bgColor="blue" textColor="white" innerValue="수정 완료" />
        </Container>
    );
}

export default settings;
