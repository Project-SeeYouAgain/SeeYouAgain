import React, { useState, useEffect } from 'react';
import { WebMenuData } from './WebMenuData';
import Link from 'next/link';
import { BiHomeAlt2 } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs';
import { BsChatDots } from 'react-icons/bs';
import { useRouter } from 'next/router';
import classNames from 'classnames';

function WebNavbar() {
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
        return WebMenuData.map((item, index: number) => {
            const isActive = currentUrl === item.url; // 현재 선택된 아이템인지 확인
            const iconClass = isActive ? 'text-blue font-bold ' : 'text-darkgrey';
            return (
                <Link key={index} href={item.url}>
                    <li className={classNames(' text-darkgrey  items-center ')}>
                        <div className={classNames('font-NanumNeo m-8 h-[1.5rem] text-[1.1rem]', iconClass)}>{item.title}</div>
                    </li>
                </Link>
            );
        });
    };
    return (
        <div className="fixed top-0 right-0 z-30 w-full">
            <ul className="flex justify-end items-center h-[6.25rem] w-full  text-center  bg-white ">{MenuDataNods()}</ul>
        </div>
    );
}

export default WebNavbar;
