import React, { useState, useEffect } from 'react';
import { MenuData } from './MenuData';
import Link from 'next/link';
import { BiHomeAlt2 } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs';
import { BsChatDots } from 'react-icons/bs';
import { useRouter } from 'next/router';

function Navbar() {
    const router = useRouter();
    const currentUrl = router.asPath;
    const MenuDataNods = () => {
        return MenuData.map((item, index: number) => {
            const isActive = currentUrl === item.url; // 현재 선택된 아이템인지 확인
            const iconClass = isActive ? 'w-[1.8rem] h-[1.8rem] text-blue mt-[.2rem]' : 'w-[1.8rem] h-[1.8rem] text-darkgrey mt-[.2rem]';
            return (
                <Link key={index} href={item.url}>
                    <li className="whitespace-nowrap text-darkgrey  items-center " style={{ fontFamily: 'Pretendard-Bold' }}>
                        <div>
                            {item.icon === 'BiHomeAlt2' && <BiHomeAlt2 className={iconClass} />}
                            {item.icon === 'AiOutlineSearch' && <AiOutlineSearch className={iconClass} />}
                            {item.icon === 'AiOutlinePlusCircle' && <AiOutlinePlusCircle className={iconClass} />}
                            {item.icon === 'BsPerson' && <BsPerson className={iconClass} />}
                            {item.icon === 'BsChatDots' && <BsChatDots className={iconClass} />}
                        </div>
                        <div className={iconClass}>{item.title}</div>
                    </li>
                </Link>
            );
        });
    };
    return (
        <div>
            <ul className="flex absolute bottom-0 h-[4.5rem] w-[100vw] justify-between items-center text-center pl-[5vw] pr-[5vw] bg-lightgrey"> {MenuDataNods()} </ul>
        </div>
    );
}

export default Navbar;
