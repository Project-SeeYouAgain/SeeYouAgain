import React, { useState, useEffect } from 'react';
import { MenuData } from './MenuData';
import Link from 'next/link';
import { BiHomeAlt2 } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs';
import { BsChatDots } from 'react-icons/bs';

function Navbar() {
    const MenuDataNods = () => {
        return MenuData.map((item, index: number) => {
            return (
                <Link key={index} href={item.url}>
                    <li className="whitespace-nowrap text-darkgrey  items-center " style={{ fontFamily: 'Pretendard-Bold' }}>
                        <div>
                            {item.icon === 'BiHomeAlt2' && <BiHomeAlt2 className="w-[1.8rem] h-[1.8rem] text-darkgrey" />}
                            {item.icon === 'AiOutlineSearch' && <AiOutlineSearch className="w-[1.8rem] h-[1.8rem] text-darkgrey" />}
                            {item.icon === 'AiOutlinePlusCircle' && <AiOutlinePlusCircle className="w-[1.8rem] h-[1.8rem] text-darkgrey" />}
                            {item.icon === 'BsPerson' && <BsPerson className="w-[1.8rem] h-[1.8rem] text-darkgrey " />}
                            {item.icon === 'BsChatDots' && <BsChatDots className="w-[1.8rem] h-[1.8rem] text-darkgrey" />}
                        </div>
                        <div className="mt-[.3rem]">{item.title}</div>
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
