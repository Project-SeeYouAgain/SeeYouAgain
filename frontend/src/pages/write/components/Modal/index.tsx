import React from 'react';
import Image from 'next/image';
import questionmark from '../../../../../public/icon/question.png';

function Modal({ isModalOpen, message, onClose }: { isModalOpen: boolean; message: string; onClose: () => void }) {
    if (!isModalOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-[100%] h-[100%] flex justify-center	items-center" style={{ backgroundColor: 'rgba(0,0,0, 0.5)' }}>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white items-center w-[70%] h-[13rem] text-center rounded-[.4rem]">
                <p className="absolute w-[20rem] top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Image src={questionmark} alt="camera" className="w-[4rem] m-auto " />
                    <span className="font-bold">{message}</span>를<span> 입력 해주세요! </span>
                </p>
                <button className="absolute bg-blue w-[100%] h-[20%] text-white bottom-0 left-1/2 transform -translate-x-1/2" onClick={onClose}>
                    확인
                </button>
            </div>
        </div>
    );
}

export default Modal;
