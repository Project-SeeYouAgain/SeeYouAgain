import React, { FunctionComponent, HTMLProps } from 'react';
import { AiOutlineLeft } from 'react-icons/ai';

interface HeaderProps {
    title1: string;
    title2: string;
}

const MainHeader: FunctionComponent<HeaderProps> = ({ title1, title2 }) => {
    return (
        <div className="p-4 text-center">
            <p className="font-semibold text-[20px] text-[#5669FF]">{title1} </p>
            <p className="font-bold text-[20px] text-[#5669FF]">{title2}</p>
        </div>
    );
};

export default MainHeader;
