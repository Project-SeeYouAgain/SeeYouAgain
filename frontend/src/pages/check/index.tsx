import React, { useState } from 'react';
import { axAuth } from '@/apis/axiosinstance';

import { useRouter } from 'next/router';

function SignUp() {
    const router = useRouter();
    const [nickName, setNickName] = useState<string>('');

    // 엔터 제출 막기
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };
    const sendNickName = () => {
        axAuth({
            method: 'patch',
            url: `/user-service/auth/nickname`,
            data: { nickname: nickName },
        })
            .then(res => {
                document.cookie = `nickname = ${nickName}`;

                router.push('/home');
            })

            .catch(err => console.log(err));
    };

    const getNickName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNickName(event.target.value);
    };
    return (
        <div>
            <div>닉네임을 입력해주세요.</div>
            <label htmlFor="nick">닉네임</label>
            <input type="text" value={nickName} onChange={getNickName} onKeyUp={handleKeyPress} />
            <button onClick={sendNickName}>다음</button>
        </div>
    );
}

export default SignUp;
