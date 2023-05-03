import React, { useState, useEffect } from 'react';

interface MenuProps {
    onSelectMenu: (data: number) => void;
}

function Menu({ onSelectMenu }: MenuProps) {
    const [menu, setMenu] = useState<number>(1);
    const [url, setUrl] = useState<string>('');
    const selectMenu = (num: number) => {
        setMenu(num);
        onSelectMenu(num);
    };

    useEffect(() => {
        // console.log(window.location.pathname);
        setUrl(window.location.pathname);
    }, []);

    return (
        <div>
            <div className="flex mb-5 border-b">
                <div className={`w-1/2 p-3 text-lg border-b ${menu === 1 ? 'border-blue' : ''}`} onClick={() => selectMenu(1)}>
                    <p className="text-center">대여중</p>
                </div>
                <div className={`w-1/2 p-3 text-lg border-b ${menu === 2 ? 'border-blue' : ''}`} onClick={() => selectMenu(2)}>
                    <p className="text-center">예약중</p>
                </div>
                {url === '/mypage/rent' ? (
                    <div className={`w-1/2 p-3 text-lg border-b ${menu === 3 ? 'border-blue' : ''}`} onClick={() => selectMenu(3)}>
                        <p className="text-center">반납완료</p>
                    </div>
                ) : (
                    <div className={`w-1/2 p-3 text-lg border-b ${menu === 3 ? 'border-blue' : ''}`} onClick={() => selectMenu(3)}>
                        <p className="text-center">숨김</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Menu;
