import React, { useEffect, useState } from 'react';
import { axAuth, axBase } from '@/apis/axiosinstance';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState, productState, reservationIdState } from 'recoil/user/atoms';
import Calender from '../../components/Card/Calender';
import Square from '../Button/Square';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface ItemCardOptionProps {
    isRent: boolean;
    menuState: number;
    dropdownVisible: boolean;
    productId: number;
    ownerId?: number;
    start?: string;
    end?: string;
    isBooked?: boolean;
    reservationId?: number;
    title?: string;
}

const ItemCardOption: React.FC<ItemCardOptionProps> = ({ isRent, menuState, dropdownVisible, productId, ownerId, start, end, reservationId, title }) => {
    interface bookdatatype {
        startDate: string;
        endDate: string;
    }
    const router = useRouter();
    const token = useRecoilValue(userState).accessToken;
    const [modalNum, setModalNum] = useState<number>(0);
    const [bookData, setBookData] = useState<bookdatatype[]>([]);
    const [productStateData, setProductStateData] = useRecoilState(productState);
    const [reservationIdStateData, setReservationIdStateData] = useRecoilState(reservationIdState);

    function CancelBook() {
        setModalNum(0);
        let type;
        if (isRent) {
            type = 1;
        } else {
            type = 0;
        }
        const url = `/product-service/auth/reservation/${type}/${productId}`;
        axAuth(token)({ method: 'delete', url: url })
            .then(() => {
                console.log('예약 취소 완료');
                setProductStateData({
                    ...productStateData,
                    refreshKey: productStateData.refreshKey + 1,
                });
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
        const url = `/product-service/auth/reservation/list/${productId}`;
        axBase(token)({ url: url })
            .then(res => {
                setBookData(res.data.data);
                setModalNum(2);
            })
            .catch(err => console.log(err));
    }

    function GoReview(event: React.MouseEvent) {
        event.stopPropagation();
        event.preventDefault();
        const url = `/chatting-service/auth/channel`;
        const myData = {
            productId: productId,
            ownerId: ownerId,
        };
        axBase(token)({ method: 'post', url: url, data: myData })
            .then(res => {
                if (reservationId && title) {
                    setReservationIdStateData({
                        ...reservationIdStateData,
                        reservationId: reservationId,
                        title: title,
                    });
                }
                router.push(`/chat/${res.data.data}/rating`);
            })
            .catch(err => console.log(err));
    }

    function GoChat() {
        const url = `/chatting-service/auth/channel`;
        const myData = {
            productId: productId,
            ownerId: ownerId,
        };
        axBase(token)({ method: 'post', url: url, data: myData })
            .then(res => {
                router.push(`/chat/${res.data.data}`);
            })
            .catch(err => console.log(err));
    }

    function openDeleteConfirm(event: React.MouseEvent) {
        event.stopPropagation();
        event.preventDefault();
        setModalNum(3);
    }

    function DeleteItem() {
        const url = `/product-service/auth/${productId}`;
        axAuth(token)({ method: 'delete', url: url })
            .then(() => {
                setModalNum(0);
                setProductStateData({
                    ...productStateData,
                    refreshKey: productStateData.refreshKey + 1,
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    if (dropdownVisible) {
        return (
            <>
                <div className="bg-white shadow-md rounded absolute top-[1.5rem] right-0 rounded-[3px]">
                    {isRent ? (
                        menuState === 1 ? (
                            <>
                                <div className="block px-4 py-2" onClick={(event: React.MouseEvent) => OpenCalender(event)}>
                                    대여일정
                                </div>
                                <div className="block px-4 py-2" onClick={GoChat}>
                                    채팅
                                </div>
                            </>
                        ) : menuState === 2 ? (
                            <>
                                <div className="block px-4 py-2" onClick={(event: React.MouseEvent) => OpenCalender(event)}>
                                    대여일정
                                </div>
                                <div className="block px-4 py-2" onClick={(event: React.MouseEvent) => OpenConfirmBookCancel(event)}>
                                    예약취소
                                </div>
                            </>
                        ) : (
                            <div className="block px-4 py-2" onClick={(event: React.MouseEvent) => GoReview(event)}>
                                리뷰작성
                            </div>
                        )
                    ) : menuState === 1 ? (
                        <>
                            <div className="block px-4 py-2" onClick={(event: React.MouseEvent) => OpenCalender(event)}>
                                대여일정
                            </div>
                            <div className="block px-4 py-2" onClick={(event: React.MouseEvent) => OpenConfirmBookCancel(event)}>
                                예약취소
                            </div>
                        </>
                    ) : menuState === 2 ? (
                        <>
                            <div className="block px-4 py-2" onClick={(event: React.MouseEvent) => OpenCalender(event)}>
                                대여일정
                            </div>
                        </>
                    ) : (
                        <div className="block px-4 py-2" onClick={(event: React.MouseEvent) => openDeleteConfirm(event)}>
                            삭제
                        </div>
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
                            <div className="bg-white p-8 rounded-lg shadow-md absolute w-[70%] text-center">
                                <span>예약을 취소하시겠습니까?</span>
                                <div className="w-[100%] flex justify-around">
                                    <Square bgColor="blue" textColor="white" innerValue="예" className="w-[5rem]" onClick={CancelBook} />
                                    <Square textColor="white" innerValue="아니오" className="w-[5rem] bg-[#FF6262]" onClick={() => setModalNum(0)} />
                                </div>
                            </div>
                        ) : modalNum === 2 ? (
                            <div className="bg-white rounded-[1.5rem] shadow-md absolute w-[90%] pt-4 px-4 pb-4 flex flex-col items-center">
                                {start && end ? (
                                    <Calender reservationPeriods={bookData.slice(1)} availablePeriod={bookData[0]} startDate={start} endDate={end} />
                                ) : (
                                    <Calender reservationPeriods={bookData.slice(1)} availablePeriod={bookData[0]} />
                                )}

                                <Square bgColor="blue" textColor="white" innerValue="확인" className="w-[100%] bg-[#FF6262]" onClick={() => setModalNum(0)} />
                            </div>
                        ) : modalNum === 3 ? (
                            <div className="bg-white p-6 rounded-lg shadow-md absolute w-[80%] text-center">
                                <span>해당 아이템을 삭제하시겠습니까?</span>
                                <div className="w-[100%] flex justify-around">
                                    <Square bgColor="blue" textColor="white" innerValue="예" className="w-[5rem]" onClick={DeleteItem} />
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
