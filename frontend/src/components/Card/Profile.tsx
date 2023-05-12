import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import MannerScore from './MannerScore';
import Image from 'next/image';

interface propdata {
    profileImg: string;
    nickname: string;
    location: string;
    description: string;
    mannerScore: number;
}

function Profile(data: propdata) {
    return (
        <div>
            <div className="flex">
                <div className="bg-black rounded-full w-[60px] h-[60px] mr-[1rem]">
                    {data.profileImg && <Image src={data.profileImg} alt="이미지" className="w-Full h-Full" />}
                    {!data.profileImg && <FaUserCircle className="w-full h-full" />}
                </div>
                <div className="flex flex-col justify-center">
                    <div className="flex">
                        <span className="mr-[0.3rem] text-[16px] font-bold">{data.nickname}</span>
                        <MannerScore score={data.mannerScore} />
                    </div>
                    <span className="text-[#959595]">{data.location ? data.location : '동네인증 필요'}</span>
                </div>
            </div>
            <div className="shadow-[0px_0px_0.31rem_0.19rem_rgba(0,0,0,0.05)] rounded-[0.69rem] min-h-[4.75rem] p-[1rem] mt-[1.2rem]">{data.description ? data.description : '잘부탁드려요~'}</div>
        </div>
    );
}

export default Profile;
