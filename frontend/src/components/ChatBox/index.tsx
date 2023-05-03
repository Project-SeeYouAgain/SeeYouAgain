import React from 'react';
import Image from 'next/image';
import default_user from '@/images/default_user.png';

type ChatBoxProps = {
    chat: string;
    profileImg: string;
    writerId: number;
    userId: number;
};

function ChatBox({ chat, profileImg, writerId, userId }: ChatBoxProps) {
    return (
        <div>
            {writerId === userId ? (
                <div className="flex justify-end items-center mt-2">
                    <div className="py-2 px-3 rounded-full text-white" style={{ background: '#5669ff' }}>
                        {chat}
                    </div>
                </div>
            ) : (
                <div className="flex justify-start items-center mt-2">
                    <div className="w-1/6 me-2 relative" style={{ width: 40, height: 40 }}>
                        <Image src={profileImg ? profileImg : default_user} alt="프로필 이미지" className="rounded-full object-cover" fill />
                    </div>
                    <div className="bg-gray-200 py-2 px-3 rounded-full">{chat}</div>
                </div>
            )}
        </div>
    );
}

export default ChatBox;
