import React, { useRef, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

interface ChatData {
    applyId: string;
    chat: string;
}

function Channel() {
    const router = useRouter();
    const [chatList, setChatList] = useState<ChatData[]>([]);
    const [chat, setChat] = useState<string>('');

    const { apply_id } = router.query;
    const client = useRef<Stomp.Client | null>(null);

    const connect = () => {
        const socket = new SockJS('http://localhost:8000/chatting-service/ws');
        client.current = Stomp.over(socket);
        client.current.connect({}, () => {
            console.log('success');
            subscribe();
        });
    };

    const subscribe = () => {
        client.current?.subscribe('/sub/chat/' + apply_id, body => {
            const json_body: ChatData = JSON.parse(body.body);
            setChatList((_chat_list: ChatData[]) => [..._chat_list, json_body]);
        });
    };

    const publish = (chat: string) => {
        if (!client.current?.connected) return;

        client.current.send(
            '/pub/chat',
            {},
            JSON.stringify({
                channelId: apply_id,
                userId: 1,
                nickname: 'nickname',
                message: chat,
            }),
        );

        setChat('');
    };

    const disconnect = () => {
        client.current?.disconnect(() => {
            console.log('방이 닫혔습니다.');
        });
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChat(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>, chat: string) => {
        event.preventDefault();

        publish(chat);
    };

    useEffect(() => {
        connect();

        return () => disconnect();
    }, [subscribe, apply_id]);

    return (
        <div>
            <div className="chat-list">
                {chatList.map((chatData, index) => (
                    <div key={index}>
                        <span>{chatData.applyId}: </span>
                        <span>{chatData.chat}</span>
                    </div>
                ))}
            </div>
            <form onSubmit={event => handleSubmit(event, chat)}>
                <div>
                    <input type={'text'} name={'chatInput'} onChange={handleChange} value={chat} />
                </div>
                <input type={'submit'} value={'보내기'} />
            </form>
        </div>
    );
}

export default Channel;
