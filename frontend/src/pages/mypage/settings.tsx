// settings.tsx
import { axAuth } from '@/apis/axiosinstance';
import SquareLg from '@/components/Button/SquareLg';
import Container from '@/components/Container';
import Body from '@/components/Container/components/Body';
import Header from '@/components/Container/components/Header';
import ProfileImage from '@/components/UserAvatar';
import defaultUserImage from '@/images/default_user.png';
import pen from '@/images/pen.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user/atoms';

function settings() {
    const [firstValue, setFirstValue] = useState<string>('');
    const [secondValue, setSecondValue] = useState<string>('');
    const [image, setImage] = useState<File | undefined>();
    const router = useRouter();

    const changeFirstValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstValue(event.target.value);
    };

    const changeSecondValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSecondValue(event.target.value);
    };
    const handleImageChange = (file: File) => {
        setImage(file);
    };

    const token = useRecoilValue(userState).accessToken;
    const setting = () => {
        const formData = new FormData();
        formData.append('location', firstValue);
        formData.append('description', secondValue);
        if (image) {
            formData.append('image', image);
        }
        console.log(image);
        axAuth(token)({
            method: 'patch',
            url: '/user-service/auth/profile',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formData,
        })
            .then((res: any) => {
                alert('프로필이 수정되었습니다!');
                router.push('/home');
            })
            .catch((err: any) => console.log(err));
    };

    return (
        <Container className="relative">
            <Header title="프로필 수정"></Header>
            <Body>
                <ProfileImage defaultImage={defaultUserImage} onChange={handleImageChange} />
                <div className="mt-4">
                    <p className="m-1 font-bol">동네설정</p>
                    <div className="flex items-center bg-gray-200 p-2 rounded-xl">
                        <input type="text" className="w-[95%] bg-transparent" value={firstValue} onChange={changeFirstValue} />
                        <Image src={pen} alt="pen" className="m-1 h-3 w-3" />
                    </div>
                </div>
                <div className="mt-4">
                    <p className="m-1 font-bol">소개 메세지</p>
                    <div className="flex bg-gray-200 p-2 rounded-xl">
                        <textarea className="w-[95%] bg-transparent" value={secondValue} onChange={changeSecondValue} />
                        <Image src={pen} alt="pen" className="m-1 h-3 w-3" />
                    </div>
                </div>
            </Body>
            <SquareLg divClass="absolute bottom-1 w-full px-[1.88rem]" bgColor="blue" textColor="white" innerValue="수정 완료" onClick={setting} />
        </Container>
    );
}

export default settings;
