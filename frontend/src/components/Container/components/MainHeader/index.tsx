import React, { FunctionComponent, HTMLProps } from 'react';
import { AiOutlineLeft } from 'react-icons/ai';

interface HeaderProps {
    title1: string;
    title2: string;
}

const MainHeader: FunctionComponent<HeaderProps> = ({ title1, title2 }) => {
    return (
        <div className="flex items-center p-4">
            <div>
                <AiOutlineLeft color="#5669FF" size="24" />
            </div>
            <div className="text-center ml-[28vw]">
                <p className=" font-semibold  text-[20px] text-[#5669FF]">{title1}</p>
                <p className="font-bold   text-[20px] text-[#5669FF]">{title2}</p>
            </div>
        </div>
    );
};

export default MainHeader;
