import React, { useState, useEffect } from 'react';
import { MenuData } from './MenuData';
import Link from 'next/link';
import { BiHomeAlt2 } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs';
import { BsChatDots } from 'react-icons/bs';
import { useRouter } from 'next/router';
import classNames from 'classnames';

function Navbar() {
    const router = useRouter();
    const currentUrl = router.asPath;

    const [isVisible, setIsVisible] = useState(false);
    const [lastScrollPosition, setLastScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScrollPosition < lastScrollPosition) {
                // 페이지를 올릴 때 Navbar 숨기기
                setIsVisible(false);
            } else {
                // 페이지를 내릴 때 Navbar 보이기
                setIsVisible(true);
            }

            // 현재 스크롤 위치 저장
            setLastScrollPosition(currentScrollPosition);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollPosition]);
    const MenuDataNods = () => {
        return MenuData.map((item, index: number) => {
            const isActive = currentUrl === item.url; // 현재 선택된 아이템인지 확인
            const iconClass = isActive ? 'text-blue  ' : 'text-darkgrey';
            const base = 'm-auto w-[1.5rem] h-[1.5rem] mt-[.2rem]';
            return (
                <Link key={index} href={item.url}>
                    <li className={classNames('whitespace-nowrap text-darkgrey  items-center ', iconClass)} style={{ fontFamily: 'Pretendard-Bold' }}>
                        {item.icon === 'BiHomeAlt2' && <BiHomeAlt2 className={base} />}
                        {item.icon === 'AiOutlineSearch' && <AiOutlineSearch className={base} />}
                        {item.icon === 'AiOutlinePlusCircle' && <AiOutlinePlusCircle className={base} />}
                        {item.icon === 'BsPerson' && <BsPerson className={base} />}
                        {item.icon === 'BsChatDots' && <BsChatDots className={base} />}
                        <div className="w-full text-center h-[1.5rem] mt-[.2rem]">{item.title}</div>
                    </li>
                </Link>
            );
        });
    };
    return (
        <div className="fixed bottom-0 z-30">
            <ul className="grid grid-cols-5 gap-4 absolute bottom-0 h-[3.7rem] w-[100vw] justify-between items-center text-center pl-[5vw] pr-[5vw] bg-lightgrey">{MenuDataNods()}</ul>
        </div>
    );
}

export default Navbar;
