import React, { FunctionComponent, HTMLProps } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineLeft } from 'react-icons/ai';

interface HeaderProps {
    title: string;
}

const Header: FunctionComponent<HeaderProps> = ({ title }) => {

    const router = useRouter();
    
    // 뒤로가기
    const handleBack = () => {
        router.back();
    };

    return (
        <div className="relative p-4">
            <AiOutlineLeft color="#5669FF" size="24" onClick={handleBack} />
            <span className="absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] font-bold text-[20px] text-[#5669FF]">{title}</span>
        </div>
    );
};

export default Header;
