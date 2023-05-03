import React, { useState } from 'react';

interface ItemCardOptionProps {
    isRent: boolean;
    menuState: number;
    dropdownVisible: boolean;
}

const ItemCardOption: React.FC<ItemCardOptionProps> = ({ isRent, menuState, dropdownVisible }) => {
    if (dropdownVisible) {
        return (
            <div className="bg-white shadow-md rounded absolute top-[1.5rem] right-0 rounded-[3px]">
                {isRent ? (
                    menuState === 1 ? (
                        <>
                            <a href="#" className="block px-4 py-2">
                                대여일정
                            </a>
                            <a href="#" className="block px-4 py-2">
                                반납하기
                            </a>
                        </>
                    ) : menuState === 2 ? (
                        <>
                            <a href="#" className="block px-4 py-2">
                                대여일정
                            </a>
                            <a href="#" className="block px-4 py-2">
                                예약취소
                            </a>
                        </>
                    ) : (
                        <a href="#" className="block px-4 py-2">
                            리뷰작성
                        </a>
                    )
                ) : menuState === 1 ? (
                    <>
                        <a href="#" className="block px-4 py-2">
                            대여일정
                        </a>
                        <a href="#" className="block px-4 py-2">
                            끌어올리기
                        </a>
                    </>
                ) : menuState === 2 ? (
                    <>
                        <a href="#" className="block px-4 py-2">
                            대여일정
                        </a>
                        <a href="#" className="block px-4 py-2">
                            숨김
                        </a>
                    </>
                ) : (
                    <a href="#" className="block px-4 py-2">
                        재등록
                    </a>
                )}
            </div>
        );
    } else {
        return null;
    }
};

export default ItemCardOption;
