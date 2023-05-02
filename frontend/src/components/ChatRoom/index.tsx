import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
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

function timeAgo(date: string): string {
    const currentDate = new Date();
    const messageDate = new Date(date);
    const diffInSeconds = Math.floor((currentDate.getTime() - messageDate.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return `${diffInSeconds}초 전`;
    }
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes}분 전`;
    }
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours}시간 전`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
        return `${diffInDays}일 전`;
    }
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
        return `${diffInMonths}개월 전`;
    }
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears}년 전`;
}

function ChatRoom({ profileImg, nickname, location, latestMessageDate, latestMessage, productImg, identifier }: ChatRoomProps) {
    return (
        <Link href={`/chat/${identifier}`} className="border-b-1 flex mb-5" role="button">
            <div className="w-1/6 me-4">
                <Image src={profileImg ? profileImg : default_user} alt="프로필 이미지" className="rounded-full object-cover" width="50" height="50" />
            </div>
            <div className="w-4/6">
                <div className="flex items-end">
                    <p className="font-medium me-2">{nickname}</p>
                    <p className="text-gray-500 me-1 font-light">{location}</p>
                    <p className="text-gray-500 font-light">{timeAgo(latestMessageDate)}</p>
                </div>
                <p>{latestMessage}</p>
            </div>
            <div className="w-6/1">
                <Image src={productImg} alt="물품 이미지" className="rounded-md object-cover" width="50" height="50" />
            </div>
        </Link>
    );
}

export default ChatRoom;
