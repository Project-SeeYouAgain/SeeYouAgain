import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import default_user from '@/images/default_user.png';
import { BsDot } from 'react-icons/bs';

type ChatRoomProps = {
    profileImg: string;
    nickname: string;
    location: string;
    latestMessageDate: string;
    latestMessage: string;
    productImg: string;
    identifier: string;
    notReadMessageSize: number;
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

function ChatRoom({ profileImg, nickname, location, latestMessageDate, latestMessage, productImg, identifier, notReadMessageSize }: ChatRoomProps) {
    return (
        <Link href={`/chat/${identifier}`} className="border-b-1 flex mb-5 items-center" role="button">
            <div className="w-[50px] relative" style={{ width: 50, height: 50 }}>
                <Image src={profileImg ? profileImg : default_user} alt="프로필 이미지" className="rounded-full object-cover" fill />
            </div>
            <div className="grow items-center px-2">
                <div className="flex items-center">
                    <p className="font-medium pr-[2px]">{nickname}</p>
                    <p className="text-gray-500 font-light text-xs pr-[2px]">{location}</p>
                    <p className="text-gray-500 font-light text-xs">
                        <span className="flex items-center justify-center">
                            <BsDot className="mr-[1px]" />
                            {timeAgo(latestMessageDate)}
                        </span>
                    </p>
                </div>
                <p className="truncate">{latestMessage}</p>
            </div>
            {notReadMessageSize > 0 && <p className="text-white text-center text-sm rounded-full bg-blue aspect-square w-5 h-5 me-2">{notReadMessageSize}</p>}
            <div className="w-[50px] flex justify-end items-center">
                <div className="relative" style={{ width: 50, height: 50 }}>
                    <Image src={productImg} alt="물품 이미지" className="rounded-md object-cover" fill />
                </div>
            </div>
        </Link>
    );
}

export default ChatRoom;
