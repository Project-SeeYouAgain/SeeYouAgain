import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import style from './index.module.scss';
import Image from 'next/image';
import default_user from '@/images/default_user.png';

type ChatRoomProps = {
    profileImg: string;
    nickname: string;
    location: string;
    latestMessageDate: string;
    latestMessage: string;
    productImg: string;
    identifier: string;
};

function ChatRoom({ profileImg, nickname, location, latestMessageDate, latestMessage, productImg, identifier }: ChatRoomProps) {
    return (
        <Link href={`/chat/${identifier}`} className="border-b-1 flex" role="button">
            <div className="w-1/6 me-4">
                <Image src={default_user} alt="프로필 이미지" className="rounded-full object-cover" width="50" height="50" />
            </div>
            <div className="w-4/6">
                <div className="flex items-end">
                    <p className="font-medium me-2">{nickname}</p>
                    <p className="text-gray-500 me-1 font-light">{location}</p>
                    <p className="text-gray-500 font-light">{latestMessageDate}</p>
                </div>
                <p>{latestMessage}</p>
            </div>
            <div className="w-6/1">
                <Image src={default_user} alt="물품 이미지" className="rounded-md object-cover" width="50" height="50" />
            </div>
        </Link>
    );
}

export default ChatRoom;
