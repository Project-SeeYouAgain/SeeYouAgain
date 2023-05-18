import Container from '@/components/Container';
import CloseHeader from '@/components/Container/components/CloseHeader';
import React, { useEffect, useState } from 'react';
import Body from '@/components/Container/components/Body';
import DatePicker from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import { eachDayOfInterval, format, isWithinInterval, max } from 'date-fns';
import Image from 'next/image';
import location from '@/assets/icons/3Dloca.png';
import { useRouter } from 'next/router';
import { axAuth } from '@/apis/axiosinstance';
import Swal from 'sweetalert2';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from 'recoil/user/atoms';
import ResponsiveChecker from '@/components/ResponsiveChecker';
import KakaoMap from '@/components/Location/SetKakaoMap';
import pin from '@/images/location-pin.png';

function getDatesBetween(start: Date, end: Date): Date[] {
    return eachDayOfInterval({
        start: start,
        end: end,
    });
}

function formatDate(date: any) {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

function book() {
    const token = useRecoilValue(userState).accessToken;
    const [index, setIndex] = useState<number>(1);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [pickStartDate, setPickStartDate] = useState<Date | null>(null);
    const [pickEndDate, setPickEndDate] = useState<Date | null>(null);
    const [isSafe, setIsSafe] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        // 클라이언트에서만 실행되는 부작용
        // ...
        const reload = localStorage.getItem('reload');
        if (!reload) {
            localStorage.setItem('reload', 'true');
            router.reload();
        }
        return () => {
            localStorage.removeItem('reload');
        };
    }, []);
    
    const { identifier } = router.query;
    const productId = router.query.productId;
    const [unavailableDateRange, setUnavailableDateRange] = useState<Date[]>([]);
    useEffect(() => {
        if (productId) {
            axAuth(token)({ method: 'get', url: `/product-service/auth/${productId}` }).then(res => {
                setIsSafe(res.data.data.isSafe);
            });
        }
    }, [productId]);
    useEffect(() => {
        if (productId) {
            axAuth(token)({ method: 'get', url: `/product-service/auth/reservation/list/${productId}` }).then((res: any) => {
                console.log(res.data.data[0]);
                setStartDate(new Date(res.data.data[0].startDate));
                setEndDate(new Date(res.data.data[0].endDate));

                const reservations = res.data.data;
                const unavailableDates = reservations.slice(1).map((reservation: any) => ({
                    startDate: new Date(reservation.startDate),
                    endDate: new Date(reservation.endDate),
                }));

                const disabledDates: Date[] = [];
                unavailableDates.forEach(({ startDate, endDate }: { startDate: Date; endDate: Date }) => {
                    const dates = getDatesBetween(startDate, endDate);
                    disabledDates.push(...dates);
                });

                setUnavailableDateRange(disabledDates);
                console.log(disabledDates);
            });
        }
    }, [productId]);
    const goTo = () => {
        setIndex(2);
    };
    const [lng, setLng] = useState<number>(0);
    const [lat, setLat] = useState<number>(0);
    const [dong, setDong] = useState<string | null>(null);
    const close = () => {
        router.push(`/${productId}`);
    };
    useEffect(() => {
        const geocoder = new kakao.maps.services.Geocoder();
        if (location) {
            geocoder.coord2RegionCode(lng, lat, (result: any, status: any) => {
                if (status == 'OK') {
                    setDong(result[0].region_3depth_name);
                }
            });
        }
    }, [lng, lat]);
    const reservation = () => {
        const data = {
            startDate: formatDate(pickStartDate),
            endDate: formatDate(pickEndDate),
            lng: Number(lng),
            lat: Number(lat),
            location: dong,
        };
        console.log(router.query);
        axAuth(token)({
            method: 'post',
            url: `/product-service/auth/reservation/request/${productId}`,
            data: data,
        })
            .then((res: any) => {
                Swal.fire({
                    title: '예약 성공',
                    text: '성공했습니다.',
                    icon: 'success', // 성공, 에러, 경고 등의 아이콘을 선택할 수 있습니다.
                    confirmButtonText: '확인', // 버튼 텍스트를 지정할 수 있습니다.
                    confirmButtonColor: '#3085d6',
                }).then(result => {
                    if (result.isConfirmed) {
                        axAuth(token)({
                            url: `product-service/product/${productId}`,
                        }).then(res => {
                            axAuth(token)({
                                url: `user-service/auth/notification`,
                                method: 'post',
                                data: {
                                    targetUserId: res.data.data.ownerId,
                                    title: '예약 알림',
                                    body: `${res.data.data.title} 예약 요청이 도착했습니다.`,
                                },
                            });
                        });

                        router.push(`/chat/${identifier}`);
                    } else if (result.isDenied) {
                        // 취소 버튼 클릭 시 처리할 로직
                    }
                });
                setTimeout(() => {
                    Swal.clickConfirm();
                }, 3000);
            }) // 잘 들어갔는지 확인
            .catch((err: any) => console.log(err)); // 어떤 오류인지 확인)
    };
    const handleDateChange = (update: [Date | null, Date | null]) => {
        setPickStartDate(update[0]);
        setPickEndDate(update[1]);
        const startDate = update[0];
        const endDate = update[1];

        if (startDate && endDate) {
            const selectedRangeHasUnavailableDates = unavailableDateRange.some(date => isWithinInterval(date, { start: startDate, end: endDate }));
            if (selectedRangeHasUnavailableDates) {
                Swal.fire({
                    title: '날짜 선택 오류',
                    text: '선택한 범위 내에 예약할 수 없는 날짜가 포함되어 있습니다.',
                    icon: 'error',
                    confirmButtonText: '확인',
                    timer: 2000, // 3초 뒤에 자동으로 닫히게 설정합니다.
                    timerProgressBar: true, // 타이머 진행바를 표시합니다.
                    willClose: () => {
                        Swal.showLoading();
                    },
                });
                setPickStartDate(null);
                setPickEndDate(null);
            } else {
            }
        }
    };
    const minDate = startDate ? max([new Date(), startDate]) : new Date();
    const [isMobile, setIsMobile] = useState<boolean | null>(null);
    const message = '이 페이지는 모바일 기기에서 최적화되어 있습니다. 모바일로 접속해주세요.';
    const handleIsMobileChanged = (mobile: boolean) => {
        setIsMobile(mobile);
    };

    // const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>({ lat: 35.149409, lng: 126.914957 });
    const [score, setScore] = useState<number>(0);

    const [myCheck, setMyCheck] = useState(true);
    const clickPosition = () => {
        console.log(lat, lng, score);
        if (lat == 0 && lng == 0) {
            Swal.fire({
                title: '죄송합니다.',
                text: '위치를 찾지 못했습니다.',
                icon: 'warning',
                confirmButtonText: '확인',
                timer: 2000, // 3초 뒤에 자동으로 닫히게 설정합니다.
                timerProgressBar: true, // 타이머 진행바를 표시합니다.
                willClose: () => {
                    Swal.showLoading();
                },
            });
        } else {
            if (score >= 7.5) {
                Swal.fire({
                    title: '안전지수 3단계',
                    text: '주변에 CCTV,가로등,경찰서이 \n 모두 있습니다.',
                    icon: 'success', // 성공, 에러, 경고 등의 아이콘을 선택할 수 있습니다.
                    confirmButtonText: '확인', // 버튼 텍스트를 지정할 수 있습니다.
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: '취소',
                }).then(result => {
                    if (result.isConfirmed) {
                        // 확인 버튼 클릭 시 처리할 로직
                        setIndex(1);
                    } else if (result.isDenied) {
                        // 취소 버튼 클릭 시 처리할 로직
                    }
                });
            } else if (score >= 5) {
                Swal.fire({
                    title: '안전지수 2단계',
                    text: '주변에 CCTV,가로등, 경찰서이 \n여러개 있습니다.\n3개다 있진 않을수도 있습니다.',
                    icon: 'success', // 성공, 에러, 경고 등의 아이콘을 선택할 수 있습니다.
                    confirmButtonText: '확인', // 버튼 텍스트를 지정할 수 있습니다.
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: '취소',
                }).then(result => {
                    if (result.isConfirmed) {
                        setIndex(1);
                    } else if (result.isDenied) {
                        // 취소 버튼 클릭 시 처리할 로직
                    }
                });
            } else if (score >= 2.5) {
                Swal.fire({
                    title: '안전지수 1단계',
                    text: '주변에 CCTV 또는 가로등이 \n1개 있습니다. 경찰서는 없습니다.',
                    icon: 'success', // 성공, 에러, 경고 등의 아이콘을 선택할 수 있습니다.
                    confirmButtonText: '확인', // 버튼 텍스트를 지정할 수 있습니다.
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: '취소',
                }).then(result => {
                    if (result.isConfirmed) {
                        setIndex(1);
                    } else if (result.isDenied) {
                        // 취소 버튼 클릭 시 처리할 로직
                    }
                });
            } else {
                if (isSafe) {
                    Swal.fire({
                        title: '안전지대 밖입니다.',
                        text: '해당 거래는 세이프존에서만 가능합니다.',
                        icon: 'warning', // 성공, 에러, 경고 등의 아이콘을 선택할 수 있습니다.
                        confirmButtonText: '확인', // 버튼 텍스트를 지정할 수 있습니다.
                        confirmButtonColor: '#3085d6',
                        timer: 2000, // 3초 뒤에 자동으로 닫히게 설정합니다.
                        timerProgressBar: true, // 타이머 진행바를 표시합니다.
                        willClose: () => {
                            Swal.showLoading();
                        },
                    });
                } else {
                    Swal.fire({
                        title: '안전지대 밖입니다.',
                        text: '주변에 경찰서,CCTV,가로등이 없어요\n계속진행하실건가요?',
                        icon: 'warning', // 성공, 에러, 경고 등의 아이콘을 선택할 수 있습니다.
                        confirmButtonText: '확인', // 버튼 텍스트를 지정할 수 있습니다.
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        cancelButtonText: '취소',
                    }).then(result => {
                        if (result.isConfirmed) {
                            setIndex(1);
                        } else if (result.isDenied) {
                            // 취소 버튼 클릭 시 처리할 로직
                        }
                    });
                }
            }
        }
    };

    const [dots, setDots] = useState('');
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (dots.length < 3) {
                setDots(prevDots => prevDots + '.');
            } else {
                setDots('');
            }
        }, 500);
        return () => clearInterval(intervalId);
    }, [dots]);

    return (
        <Container className="relative h-screen">
            <ResponsiveChecker message={message} onIsMobileChanged={handleIsMobileChanged} />
            {isMobile && (
                <>
                    {index == 1 && (
                        <>
                            <CloseHeader title="예약하기" onClose={close} />
                            <div className="px-[1.88rem]">
                                <p className="my-4 font-bold text-xl">대여기간</p>
                                <DatePicker
                                    locale={ko}
                                    inline={true}
                                    minDate={minDate}
                                    maxDate={endDate}
                                    startDate={pickStartDate}
                                    endDate={pickEndDate}
                                    excludeDates={unavailableDateRange}
                                    selectsRange
                                    onChange={handleDateChange}
                                />
                                <div className="mb-4 px-2">
                                    {pickStartDate && pickEndDate ? (
                                        <div className="grid grid-cols-2 text-left">
                                            <div className="text-blue font-bold flex">
                                                <span className="whitespace-nowrap">시작일</span>{' '}
                                                <span className="text-black font-bold w-full text-center">{format(pickStartDate, 'yy.MM.dd', { locale: ko })}</span>
                                            </div>
                                            <div className="text-blue font-bold flex">
                                                <span className="whitespace-nowrap">종료일</span>{' '}
                                                <span className="text-black font-bold w-full text-center">{format(pickEndDate, 'yy.MM.dd', { locale: ko })}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 text-blue font-bold text-left">
                                            <p>시작일</p>
                                            <p>종료일</p>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p className="font-bold text-xl"> 거래장소 </p>
                                    <div className="p-4 mt-4 w-full h-20 rounded-2xl border border-solid border-[#aeaeae] flex justify-between content-center items-center" onClick={goTo}>
                                        <p className="font-bold text-darkgrey ">{dong ? '거래장소 : ' + dong : '거래장소 선택하러 가기'} </p>
                                        <Image src={location} alt="location" className="w-16 h-16" />
                                    </div>
                                </div>
                            </div>
                            <button className="absolute bottom-0 w-full h-16 bg-blue text-white text-xl font-bold" onClick={reservation}>
                                예약확정
                            </button>
                        </>
                    )}
                    {index == 2 && (
                        <>
                            {/* 나머지 페이지 내용 */}
                            <div className="p-4 px-[1.88rem] font-bold h-[15vh] flex items-center justify-center ">
                                <div className="w-screen">
                                    <div className="flex justify-between h-fit text-xl">
                                        <div>
                                            <p>이웃과 만나서</p>
                                            <p>거래할 장소를 확인해주세요</p>
                                        </div>
                                        <div className="h-[35%]">
                                            <Image src={pin} alt="pin" />
                                        </div>
                                    </div>
                                    <p className="text-blue">세이프존에서 거래하는 것을 추천해요.</p>
                                </div>
                            </div>
                            <div id="map" className="w-full h-[85vh] relative">
                                <KakaoMap
                                    onCenter={(lat, lng, score) => {
                                        setLat(lat);
                                        setLng(lng);
                                        setScore(score);
                                    }}
                                    click={false}
                                />
                                <div className="absolute bottom-10 z-10 w-full">
                                    <button className="w-2/3 h-12 m-auto block rounded-xl text-center text-white text-xl  bg-blue" onClick={clickPosition}>
                                        장소 확정
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </Container>
    );
}

export default book;
