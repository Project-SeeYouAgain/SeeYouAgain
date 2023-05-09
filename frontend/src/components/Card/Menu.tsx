import React, { useState, useEffect } from 'react';

interface MenuProps {
    onSelectMenu: (data: number) => void;
    title1: string;
    title2: string;
    title3: string;
}

function Menu({ onSelectMenu, title1, title2, title3 }: MenuProps) {
    const [menu, setMenu] = useState<number>(1);
    const selectMenu = (num: number) => {
        setMenu(num);
        onSelectMenu(num);
    };

    return (
        <div>
            <div className="flex mb-5 border-b">
                <div className={`w-1/2 p-3 text-lg border-b ${menu === 1 ? 'border-blue' : ''}`} onClick={() => selectMenu(1)}>
                    <p className="text-center">{title1}</p>
                </div>
                <div className={`w-1/2 p-3 text-lg border-b ${menu === 2 ? 'border-blue' : ''}`} onClick={() => selectMenu(2)}>
                    <p className="text-center">{title2}</p>
                </div>
                <div className={`w-1/2 p-3 text-lg border-b ${menu === 3 ? 'border-blue' : ''}`} onClick={() => selectMenu(3)}>
                    <p className="text-center">{title3}</p>
                </div>
            </div>
        </div>
    );
}

export default Menu;
