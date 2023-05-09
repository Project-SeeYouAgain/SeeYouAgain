import React from 'react';
import Image from 'next/image';
import default_user from '@/images/default_user.png';

type ChatBoxProps = {
    chat: string;
    profileImg: string;
    writerId: number;
    userId: number;
    isRead: boolean;
};

function ChatBox({ chat, profileImg, writerId, userId, isRead }: ChatBoxProps) {
    return (
        <div>
            {writerId === userId ? (
                <div className="flex justify-end items-center mt-2">
                    {isRead || <p className="me-1">1</p>}
                    <div className="max-w-full py-2 px-3 rounded-3xl text-white" style={{ background: '#5669ff' }}>
                        <p className="break-all">{chat}</p>
                    </div>
                </div>
            ) : (
                <div className="flex justify-start mt-2">
                    <div className="w-1/6 me-2 relative" style={{ width: 40, height: 40 }}>
                        <Image src={profileImg ? profileImg : default_user} alt="프로필 이미지" className="rounded-full object-cover" fill />
                    </div>
                    <div className="w-5/6">
                        <p className="w-fit bg-gray-200 py-2 px-3 rounded-3xl max-w-full break-all">{chat}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatBox;
