import React, { useState } from 'react';
import { axAuth } from '@/apis/axiosinstance';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../../../recoil/user/atoms';
import axios, { AxiosInstance } from 'axios';

function SignUp() {
    const router = useRouter();
    const [nickName, setNickName] = useState<string>('');
    const [userData, setUserData] = useRecoilState<UserState>(userState);
    const token = useRecoilValue(userState).accessToken;

    // 엔터 제출 막기
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    const sendNickName = () => {
        if (nickName === '') {
            console.log(token);
            alert('닉네임을 입력해주세요');
        } else {
            axAuth(token)({
                method: 'patch',
                url: '/user-service/auth/nickname',
                data: { nickname: nickName },
            })
                .then(res => {
                    const nickname = res.data.data;
                    setUserData(prev => ({ ...prev, nickname }));

                    router.push('/home');
                })

                .catch(err => {
                    console.log(err);
                    alert('중복된 닉네임입니다.');
                });
        }
    };

    const getNickName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNickName(event.target.value);
    };

    return (
        <div className="relative flex pb-24 h-[100vh] w-[100vw] ">
            <div className="absolute top-1/4 w-[100%] flexbox px-10">
                <div className="text-xl font-bold pb-5">닉네임을 입력해주세요.</div>
                <div className="font-semibold">닉네임</div>
                <input
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[100%] rounded-md sm:text-sm focus:ring-1"
                    type="text"
                    placeholder="닉네임 입력"
                    value={nickName}
                    onChange={getNickName}
                    onKeyUp={handleKeyPress}
                />
            </div>
            <button className="absolute text-xl bottom-1 w-full rounded-b-xl bg-blue text-white h-16 mt-6" onClick={sendNickName}>
                다음
            </button>
        </div>
    );
}

export default SignUp;
