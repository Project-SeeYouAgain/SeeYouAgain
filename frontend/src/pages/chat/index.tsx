import React, { useEffect, useState, MouseEvent } from 'react';
import ChatRoom from '@/components/ChatRoom';
import { axAuth } from '@/apis/axiosinstance';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user/atoms';
import Navbar from '@/components/Container/components/Navbar';
import WebNavbar from './../../components/Container/components/WebNavbar/index';
import classNames from 'classnames';

interface ChatRoomData {
    nickname: string;
    profileImg: string;
    location: string;
    lastMessage: string;
    productImg: string;
    lastMessageDate: string;
    identifier: string;
    notReadMessageSize: number;
    isImage: boolean;
}

function chat() {
    const [chatRoomList, setChatRoomList] = useState<ChatRoomData[]>([]);

    const [selectedTab, setSelectedTab] = useState<string>('borrow');
    const token = useRecoilValue(userState).accessToken;

    useEffect(() => {
        getChannelList(selectedTab);

        const intervalId = setInterval(() => {
            getChannelList(selectedTab);
        }, 2000);

        // cleanup function
        return () => {
            clearInterval(intervalId);
        };
    }, [selectedTab]);

    const getChannelList = (type: string) => {
        axAuth(token)({
            url: `/chatting-service/auth/channel/${type}`,
        })
            .then(res => {
                setChatRoomList((_chat_room_list: ChatRoomData[]) => res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const selectType = (event: MouseEvent, type: string) => {
        setSelectedTab(type);
    };

    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const handleDragStart = (e: any) => {
        const touch = e.touches ? e.touches[0] : e;
        setDragStart({ x: touch.clientX, y: touch.clientY });
    };

    const handleDragEnd = (e: any) => {
        const touch = e.changedTouches ? e.changedTouches[0] : e;
        const deltaX = touch.clientX - dragStart.x;
        const deltaY = touch.clientY - dragStart.y;

        if (Math.abs(deltaY) > Math.abs(deltaX)) {
            // Ignore vertical drag
            return;
        }

        if (deltaX > -90) {
            setSelectedTab(prev => (prev === 'borrow' ? 'lend' : 'borrow'));
        } else if (deltaX < 90) {
            setSelectedTab(prev => (prev === 'borrow' ? 'lend' : 'borrow'));
        }
    };
    const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const desktopQuery = window.matchMedia('(min-width:767px)');
        const mobileQuery = window.matchMedia('(max-width:767px)');

        const handleDesktopQuery = (event: MediaQueryListEvent) => {
            setIsDesktop(event.matches);
        };

        const handleMobileQuery = (event: MediaQueryListEvent) => {
            setIsMobile(event.matches);
        };

        desktopQuery.addEventListener('change', handleDesktopQuery);
        mobileQuery.addEventListener('change', handleMobileQuery);

        // 초기값 설정
        setIsDesktop(desktopQuery.matches);
        setIsMobile(mobileQuery.matches);

        return () => {
            desktopQuery.removeEventListener('change', handleDesktopQuery);
            mobileQuery.removeEventListener('change', handleMobileQuery);
        };
    }, []);

    // 로딩 중이거나 초기 상태일 때 출력할 내용
    if (isDesktop === null || isMobile === null) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {isDesktop && <WebNavbar />}
            <div
                className={classNames('p-4 min-h-screen pb-[3.7rem] px-[1.88rem]', isDesktop ? 'mt-[100px]' : '')}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchEnd={handleDragEnd}
            >
                {/* <div className="flex justify-between mb-5 items-center border-b-1">
                    <p className="text-lg font-bold dark:text-black">채팅</p>
                    <VscBell className="text-2xl" />
                </div> */}
                <div className="relative">
                    <span className="absolute mt-4 left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] font-bold text-[20px] text-[#5669FF]">채팅</span>
                </div>
                <div className="flex mb-5 pt-[46px]">
                    <div className={`w-1/2 p-3 text-lg dark:text-black border-b ${selectedTab === 'borrow' ? 'border-blue' : ''}`} onClick={event => selectType(event, 'borrow')}>
                        <p className="text-center">빌림</p>
                    </div>
                    <div className={`w-1/2 p-3 text-lg dark:text-black border-b ${selectedTab === 'lend' ? 'border-blue' : ''}`} onClick={event => selectType(event, 'lend')}>
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
                                latestMessage={chatRoomData.isImage ? '사진' : chatRoomData.lastMessage}
                                profileImg={chatRoomData.profileImg}
                                identifier={chatRoomData.identifier}
                                notReadMessageSize={chatRoomData.notReadMessageSize}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {isMobile && <Navbar />}
        </div>
    );
}

export default chat;
