import React, { useEffect, useState } from 'react';
import { axAuth, axBase } from '@/apis/axiosinstance';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from 'recoil/user/atoms';
import Calender from '../../components/Card/Calender';
import Square from '../Button/Square';

interface ItemCardOptionProps {
    isRent: boolean;
    menuState: number;
    dropdownVisible: boolean;
    productId: number;
    onRefresh?: () => void;
}

const ItemCardOption: React.FC<ItemCardOptionProps> = ({ isRent, menuState, dropdownVisible, productId, onRefresh }) => {
    interface bookdatatype {
        startDate: string;
        endDate: string;
    }

    const token = useRecoilValue(userState).accessToken;
    const [modalNum, setModalNum] = useState<number>(0);
    const [bookData, setBookData] = useState<bookdatatype[]>([]);

    function CancelBook() {
        setModalNum(0);
        const url = `/product-service/auth/reservation/${productId}`;
        axAuth(token)({ method: 'delete', url: url })
            .then(() => {
                console.log('예약 취소 완료');
                onRefresh?.();
            })
            .catch(err => console.log(err));
    }

    function OpenConfirmBookCancel(event: React.MouseEvent) {
        event.stopPropagation();
        event.preventDefault();
        setModalNum(1);
    }

    function OpenCalender(event: React.MouseEvent) {
        event.stopPropagation();
        event.preventDefault();
        setModalNum(2);
        const url = `/product-service/auth/reservation/list/${productId}`;
        axBase(token)({ url: url }).then(res => {
            console.log(res.data.data);
            setBookData(res.data.data);
        });
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
                                <div className="block px-4 py-2" onClick={(event: React.MouseEvent) => OpenConfirmBookCancel(event)}>
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
                        {modalNum === 1 ? (
                            <div className="bg-white p-8 rounded-lg shadow-md absolute w-[70%]">
                                <span>예약을 취소하시겠습니까?</span>
                                <div className="w-[100%] flex justify-around">
                                    <Square bgColor="blue" textColor="white" innerValue="예" className="w-[5rem]" onClick={CancelBook} />
                                    <Square textColor="white" innerValue="아니오" className="w-[5rem] bg-[#FF6262]" onClick={() => setModalNum(0)} />
                                </div>
                            </div>
                        ) : null}
                    </div>
                ) : null}
            </>
        );
    } else {
        return null;
    }
};

export default ItemCardOption;
