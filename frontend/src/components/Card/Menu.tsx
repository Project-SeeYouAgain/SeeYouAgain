import React, { useState, useEffect } from 'react';

interface MenuProps {
    onSelectMenu: (data: number) => void;
    dragMenu: number;
    title1: string;
    title2: string;
    title3: string;
}

function Menu({ onSelectMenu, dragMenu, title1, title2, title3 }: MenuProps) {
    const [menu, setMenu] = useState<number>(1);
    useEffect(() => {
        setMenu(dragMenu);
    }, [dragMenu]);
    const selectMenu = (num: number) => {
        setMenu(num);
        onSelectMenu(num);
    };

    return (
        <div>
            <div className="mb-5 border-b grid grid-cols-3 gap-3">
                <div className={`w-full pb-4 border-b ${menu === 1 ? 'border-blue' : ''}`} onClick={() => selectMenu(1)}>
                    <p className="text-center">{title1}</p>
                </div>
                <div className={`w-full pb-4 border-b ${menu === 2 ? 'border-blue' : ''}`} onClick={() => selectMenu(2)}>
                    <p className="text-center">{title2}</p>
                </div>
                <div className={`w-full pb-4 border-b ${menu === 3 ? 'border-blue' : ''}`} onClick={() => selectMenu(3)}>
                    <p className="text-center">{title3}</p>
                </div>
            </div>
        </div>
    );
}

export default Menu;
