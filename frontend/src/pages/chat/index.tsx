import React from 'react';
import ChatRoom from '@/components/ChatRoom';
import { VscBell } from 'react-icons/vsc';

function chat() {
    return (
        <div className="p-4">
            <div className="flex justify-between mb-5 items-center border-b-1">
                <p className="text-lg text-bold">채팅</p>
                <VscBell className="text-2xl" />
            </div>
            <div>
                <ChatRoom chatRoomId={1} productImg="" nickname="key" location="c" latestMessageDate="d" latestMessage="넹" profileImg="f" />
            </div>
        </div>
    );
}

export default chat;
