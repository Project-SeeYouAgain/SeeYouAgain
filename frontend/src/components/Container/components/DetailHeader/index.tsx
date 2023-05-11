import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// 아이콘
import { AiOutlineLeft } from 'react-icons/ai';
import { RiAlarmWarningLine } from 'react-icons/ri';

function DetailHeader() {
    const router = useRouter();
    // 뒤로가기
    const handleBack = () => {
        router.back();
    };
    // 스크롤 위치 저장
    const [scrollY, setScrollY] = useState(0);

    // 스크롤 위치에 따른 투명도 변경
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const backgroundColor = scrollY < 200 ? 'rgba(255, 255, 255, 0.5)' : 'white';
    const textColor = scrollY < 200 ? 'white' : 'blue';

    return (
        <div className="fixed top-0 z-30">
            <div className={`flex  h-[4.5rem] w-[100vw] justify-between items-center text-center text-${textColor} pl-[5vw] pr-[5vw] bg-${backgroundColor} transition duration-300 ease-in-out`}>
                <AiOutlineLeft size={23} onClick={handleBack} />
                <RiAlarmWarningLine size={23} />
            </div>
        </div>
    );
}
export default DetailHeader;
