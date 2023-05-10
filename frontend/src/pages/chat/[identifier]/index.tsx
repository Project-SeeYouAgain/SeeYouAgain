import React, { useRef, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { axAuth } from '@/apis/axiosinstance';
import Image from 'next/image';
import ChatBox from '@/components/ChatBox';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { IoMdSend } from 'react-icons/io';
import Button from '@/components/Button';
import InfiniteScroll from 'react-infinite-scroller';
import axios, { AxiosInstance } from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from 'recoil/user/atoms';
import { Cookies } from 'react-cookie';

interface ChatData {
    messageId: number;
    writerId: number;
    profileImg: string;
    chat: string;
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
}

interface ChannelInfo {
    productId: number;
    productImg: string;
    title: string;
    price: number;
    userId: number;
    nickname: string;
    mannerScore: number;
    productState: boolean;
    type: boolean;
}

function Channel() {
    const cookie = new Cookies();
    const token = useRecoilValue(userState).accessToken;

    const router = useRouter();
    const [chatList, setChatList] = useState<ChatData[]>([]);
    const [chat, setChat] = useState<string>('');
    const [firstMessageId, setFirstMessageId] = useState<number>();
    const [lastReadMessageId, setLastReadMessageId] = useState<number>(0);
    const [channelInfo, setChannelInfo] = useState<ChannelInfo>();
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [userId, setUserId] = useState<number>(0);

    const { identifier } = router.query;
    const client = useRef<Client | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const connect = () => {
        const socket = new SockJS('https://k8c101.p.ssafy.io/chatting-service/ws');
        // const socket = new SockJS('http://localhost:8000/chatting-service/ws');

        client.current = new Client({
            webSocketFactory: () => socket,
            debug: str => console.log(str),
        });

        client.current.onConnect = () => {
            console.log('success');
            subscribe();
        };

        client.current.activate();
    };

    const subscribe = () => {
        client.current?.subscribe('/sub/chat/' + identifier, body => {
            const json_body: ChatData = JSON.parse(body.body);
            setChatList((_chat_list: ChatData[]) => [json_body, ..._chat_list]);
        });
    };

    const publish = (chat: string) => {
        if (!client.current?.connected) return;

        client.current.publish({
            destination: '/pub/chat',
            body: JSON.stringify({
                identifier: identifier,
                writerId: userId,
                chat: chat,
            }),
        });

        setChat('');
    };

    const disconnect = () => {
        if (chatList.length > 0) {
            setLastReadMessageId(chatList[0].messageId);
        }

        axAuth(token)({
            url: `/chatting-service/auth/participant/out/${identifier}/${lastReadMessageId}`,
            method: 'patch',
        });

        client.current?.deactivate();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChat(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>, chat: string) => {
        event.preventDefault();

        if (chat.trim()) {
            publish(chat);
        } else {
            setChat('');
        }
    };

    const getMessage = () => {
        let api;
        if (firstMessageId) {
            api = `/chatting-service/auth/channel/chat/${identifier}/${firstMessageId}`;
        } else {
            api = `/chatting-service/auth/channel/chat/${identifier}`;
        }

        axAuth(token)({
            url: api,
        }).then(res => {
            if (res.data.data.length > 0) {
                const messageList = res.data.data;
                setChatList((_chat_list: ChatData[]) => [..._chat_list, ...messageList]);
                setFirstMessageId(messageList[messageList.length - 1].messageId);
            } else if (res.data.data.length < 30) {
                setHasMore(false);
            }
        });
    };

    const getChannelInfo = () => {
        axAuth(token)({
            url: `/chatting-service/auth/channel/detail/${identifier}`,
        }).then(res => {
            setChannelInfo(res.data.data);
        });
    };

    const saveReadMessageSize = () => {
        axAuth(token)({
            url: `/chatting-service/auth/participant/in/${identifier}`,
            method: 'patch',
        });
    };

    useEffect(() => {
        if (!router.isReady) return;

        setUserId(Number(cookie.get("userId")));
        saveReadMessageSize();
        getChannelInfo();
        getMessage();
        connect();

        return () => disconnect();
    }, [router.isReady]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({});
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatList]);

    return (
        <div className="relative pt-48">
            <div className="fixed inset-x-0 top-0 bg-white z-50">
                {channelInfo && (
                    <div className="p-5 text-center border-b border-gray flex justify-center items-center">
                        <p className="me-1 font-bold">{channelInfo?.nickname}</p>
                        <Button.MannerPoint innerValue={`${channelInfo?.mannerScore}`} />
                    </div>
                )}
                <div className="pt-4 px-4 pb-2 border-b border-gray">
                    <div className="flex items-center">
                        <div className="m-2 relative" style={{ width: 50, height: 50 }}>
                            {channelInfo?.productImg && <Image src={channelInfo.productImg} alt="물품 이미지" className="rounded-md object-cover" fill />}
                        </div>
                        <div>
                            <p>{channelInfo?.title}</p>
                            <p className="text-sm">
                                <span className="font-bold">{channelInfo?.price}원</span>
                                <span className="text-gray-400"> /일</span>
                            </p>
                        </div>
                    </div>
                    <div>
                        <button className="border border-blue px-3 my-1 text-blue rounded-lg">예약하기</button>
                    </div>
                </div>
            </div>

            <div className="chat-list mx-5 pb-16" style={{ height: 500, overflow: 'auto' }}>
                <InfiniteScroll
                    initialLoad={false}
                    loadMore={getMessage}
                    hasMore={hasMore} // 원하는 조건에 따라서 변경하세요. 더 이상 로드할 데이터가 없으면 false로 변경하세요.
                    isReverse={true}
                    useWindow={false}
                    threshold={50}
                >
                    {chatList
                        .slice()
                        .reverse()
                        .map((chatData, index) => (
                            <ChatBox key={index} chat={chatData.chat} profileImg={chatData.profileImg} writerId={chatData.writerId} userId={userId} isRead={chatData.isRead} />
                        ))}
                    <div ref={messagesEndRef} />
                </InfiniteScroll>
            </div>

            <div className="fixed inset-x-0 bottom-0 bg-white">
                <form onSubmit={event => handleSubmit(event, chat)}>
                    <div className="flex items-center p-2 relative">
                        <div className="me-2">
                            <AiOutlinePlusCircle className="text-3xl" />
                        </div>
                        <input type={'text'} name={'chatInput'} onChange={handleChange} value={chat} placeholder="메세지를 입력하세요." className="w-11/12 bg-gray-200 py-2 ps-3 pe-10 rounded-full" />
                        <button className="absolute right-3 flex justify-center items-center rounded-full p-1.5" style={{ background: '#5669ff' }}>
                            <IoMdSend className="text-white text-lg -rotate-90" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Channel;
