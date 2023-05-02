import React, { useRef, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { axAuth } from '@/apis/axiosinstance';
import Image from 'next/image';

interface ChatData {
    identifier: string;
    writerId: number;
    nickname: string;
    profileImg: string;
    chat: string;
    createdAt: string;
    updatedAt: string;
}

interface ChannelInfo {
    productId: number;
    productImg: string;
    title: string;
    price: number;
    nickname: string;
    mannerScore: number;
    productState: boolean;
    type: boolean;
}

function Channel() {
    const router = useRouter();
    const [chatList, setChatList] = useState<ChatData[]>([]);
    const [chat, setChat] = useState<string>('');
    const [firstMessageId, setFirstMessageId] = useState<number>();
    const [channelInfo, setChannelInfo] = useState<ChannelInfo>();

    const { identifier } = router.query;
    const client = useRef<Client | null>(null);

    const connect = () => {
        const socket = new SockJS('http://localhost:8000/chatting-service/ws');

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
            console.log(json_body);
            setChatList((_chat_list: ChatData[]) => [..._chat_list, json_body]);
        });
    };

    const publish = (chat: string) => {
        if (!client.current?.connected) return;

        client.current.publish({
            destination: '/pub/chat',
            body: JSON.stringify({
                identifier: identifier,
                userId: 2,
                nickname: 'nwk',
                chat: chat,
            }),
        });

        setChat('');
    };

    const disconnect = () => {
        client.current?.deactivate();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChat(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>, chat: string) => {
        event.preventDefault();

        publish(chat);
    };

    // const createChannel = () => {
    //     axAuth({
    //         url: "/chatting-service/auth/channel" + identifier,
    //         method: "post"
    //     }).then((res) => {

    //     })
    // }

    const getMessage = () => {
        let api;
        if (firstMessageId) {
            api = `/chatting-service/auth/channel/chat/${identifier}/${firstMessageId}`;
        } else {
            api = `/chatting-service/auth/channel/chat/${identifier}`;
        }

        axAuth({
            url: api,
        }).then(res => {
            if (res.data.data && res.data.data.length > 0) {
                setChatList(() => [...res.data.data]);
                setFirstMessageId(res.data.data[0].messageId);
            }
        });
    };

    const getChannelInfo = () => {
        axAuth({
            url: `/chatting-service/auth/channel/detail/${identifier}`,
        }).then(res => {
            setChannelInfo(res.data.data);
        });
    };

    useEffect(() => {
        if (!router.isReady) return;

        getChannelInfo();
        getMessage();
        connect();

        return () => disconnect();
    }, [router.isReady]);

    return (
        <div>
            <div className="p-5 text-center border-b border-gray flex justify-center items-center">
                <p>{channelInfo?.nickname}</p>
            </div>
            <div className="p-5 flex items-center border-b border-gray">
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
            <div className="chat-list">
                {chatList.map((chatData, index) => (
                    <div key={index}>
                        <span>{chatData.nickname}: </span>
                        <span>{chatData.chat}</span>
                    </div>
                ))}
            </div>

            <form onSubmit={event => handleSubmit(event, chat)}>
                <div>
                    <input type={'text'} name={'chatInput'} onChange={handleChange} value={chat} />
                </div>
                <button type="submit">보내기</button>
            </form>
        </div>
    );
}

export default Channel;
