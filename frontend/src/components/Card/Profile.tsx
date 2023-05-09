import React, { FunctionComponent, HTMLProps } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import MannerScore from './MannerScore';

// << data: object >> 괄호에 넣어주세요
function Profile() {
    // 임시 데이터 입니다.
    const data = {
        profileImg: '',
        nickname: '장성꽃미남',
        location: '장덕동',
        description: '안녕하세요. 진짜 꽃미남인지는 저와 거래해보시면 알 수 있습니다^^',
        mannerScore: 98,
    };

    return (
        <div>
            <div className="flex">
                <FaUserCircle size="80" className="mr-[1rem]" />
                <div className="flex flex-col justify-center">
                    <div className="flex">
                        <span className="mr-[0.3rem] text-[16px] font-bold">{data.nickname}</span>
                        <MannerScore score={data.mannerScore} />
                    </div>
                    <span className="text-[#959595]">{data.location}</span>
                </div>
            </div>
            <div className="shadow-[0px_0px_0.31rem_0.19rem_rgba(0,0,0,0.05)] rounded-[0.69rem] min-h-[4.75rem] p-[1rem] mt-[1.2rem]">{data.description}</div>
            {/* {imgUrl ? <img src={imgurl} alt="" /> : <FaUserCircle />}
            <div>
              <span>{nickname}</span>
              <div>{mannerpoint}%</div>
            </div>
            <span>{address}</span> */}
        </div>
    );
}

export default Profile;
