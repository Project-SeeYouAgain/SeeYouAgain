import React, { FunctionComponent, HTMLProps } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface HeaderProps {
    title: string;
    onClose: () => void;
}

const CloseHeader: FunctionComponent<HeaderProps> = ({ title, onClose }) => {
    return (
        <div className="relative px-[1.88rem] h-[4.75rem] text-center pt-[1.25rem]">
            <span className=" font-bold text-[20px] text-blue">{title}</span>
            <AiOutlineClose className="text-blue absolute top-[1.25rem] right-[1.25rem]" onClick={onClose} size={25} />
        </div>
    );
};

export default CloseHeader;
