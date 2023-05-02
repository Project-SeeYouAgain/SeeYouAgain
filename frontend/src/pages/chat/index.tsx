import React, { useEffect, useState, useRef, MouseEvent } from 'react';
import ChatRoom from '@/components/ChatRoom';
import { VscBell } from 'react-icons/vsc';
import { axAuth } from '@/apis/axiosinstance';

interface ChatRoomData {
    nickname: string;
    profileImg: string;
    location: string;
    lastMessage: string;
    productImg: string;
    lastMessageDate: string;
    identifier: string;
}

function chat() {
    const [chatRoomList, setChatRoomList] = useState<ChatRoomData[]>([]);

    const [selectedTab, setSelectedTab] = useState<string>('borrow');

    useEffect(() => {
        getChannelList(selectedTab);
    }, [selectedTab]);

    const getChannelList = (type: string) => {
        axAuth({
            url: `/chatting-service/auth/channel/${type}`,
        })
            .then(res => {
                console.log(res.data.data);
                setChatRoomList((_chat_room_list: ChatRoomData[]) => res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const selectType = (event: MouseEvent, type: string) => {
        setSelectedTab(type);
    };

    return (
        <div className="p-4">
            <div className="flex justify-between mb-5 items-center border-b-1">
                <p className="text-lg font-bold">채팅</p>
                <VscBell className="text-2xl" />
            </div>
            <div className="flex mb-5">
                <div className={`w-1/2 p-3 text-lg border-b ${selectedTab === 'borrow' ? 'border-blue' : ''}`} onClick={event => selectType(event, 'borrow')}>
                    <p className="text-center">빌림</p>
                </div>
                <div className={`w-1/2 p-3 text-lg border-b ${selectedTab === 'lend' ? 'border-blue' : ''}`} onClick={event => selectType(event, 'lend')}>
                    <p className="text-center">빌려드림</p>
                </div>
            </div>
            <div>
                {chatRoomList.map((chatRoomData, index) => (
                    <div key={index}>
                        <ChatRoom
                            productImg={chatRoomData.productImg}
                            nickname={chatRoomData.nickname}
                            location={chatRoomData.location}
                            latestMessageDate={chatRoomData.lastMessageDate}
                            latestMessage={chatRoomData.lastMessage}
                            profileImg={chatRoomData.profileImg}
                            identifier={chatRoomData.identifier}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default chat;
