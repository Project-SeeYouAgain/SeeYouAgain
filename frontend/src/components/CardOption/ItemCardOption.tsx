import React, { useState } from 'react';
import { axAuth } from '@/apis/axiosinstance';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from 'recoil/user/atoms';

interface ItemCardOptionProps {
    isRent: boolean;
    menuState: number;
    dropdownVisible: boolean;
    productId: number;
}

const ItemCardOption: React.FC<ItemCardOptionProps> = ({ isRent, menuState, dropdownVisible, productId }) => {
    const token = useRecoilValue(userState).accessToken;
    const [modalNum, setModalNum] = useState<number>(0);
    function CancelBook(event: React.MouseEvent) {
        event.stopPropagation();
        event.preventDefault();
        setModalNum(1);
        // const url = `/product-service/auth/reservation/${productId}`;
        // axAuth(token)({ method: 'delete', url: url })
        //     .then(() => console.log('예약 취소 완료'))
        //     .catch(err => console.log(err));
    }
    if (dropdownVisible) {
        return (
            <>
                <div className="bg-white shadow-md rounded absolute top-[1.5rem] right-0 rounded-[3px]">
                    {isRent ? (
                        menuState === 1 ? (
                            <>
                                <div className="block px-4 py-2">대여일정</div>
                                <div className="block px-4 py-2">반납하기</div>
                            </>
                        ) : menuState === 2 ? (
                            <>
                                <div className="block px-4 py-2">대여일정</div>
                                <div className="block px-4 py-2" onClick={(event: React.MouseEvent) => CancelBook(event)}>
                                    예약취소
                                </div>
                            </>
                        ) : (
                            <div className="block px-4 py-2">리뷰작성</div>
                        )
                    ) : menuState === 1 ? (
                        <>
                            <div className="block px-4 py-2">대여일정</div>
                        </>
                    ) : menuState === 2 ? (
                        <>
                            <div className="block px-4 py-2">대여일정</div>
                            <div className="block px-4 py-2">숨김</div>
                        </>
                    ) : (
                        <div className="block px-4 py-2">재등록</div>
                    )}
                </div>
                {modalNum !== 0 ? (
                    <div
                        className="fixed inset-0 flex items-center justify-center z-50"
                        onClick={e => {
                            e.stopPropagation();
                            e.preventDefault();
                        }}
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        <div className="bg-white p-8 rounded-lg shadow-md"></div>
                    </div>
                ) : null}
            </>
        );
    } else {
        return null;
    }
};

export default ItemCardOption;
