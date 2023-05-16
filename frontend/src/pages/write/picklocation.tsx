import React, { useState, useEffect } from 'react';
import ResponsiveChecker from '@/components/ResponsiveChecker';
import KakaoMap from '@/components/Location/SetKakaoMap';
import pin from '@/images/location-pin.png';
import Image from 'next/image';
import styles from './userLocation.module.scss';
import Swal from 'sweetalert2';

const pickLocation = ({
    setData,
    setIsLocationOn,
    data,
    onSubmit,
}: {
    setData: React.Dispatch<React.SetStateAction<StepTwoData>>;
    setIsLocationOn: React.Dispatch<React.SetStateAction<boolean>>;
    data: StepTwoData;
    onSubmit: (data: StepTwoData) => void;
}) => {
    if (typeof window === 'undefined' || typeof kakao === 'undefined') {
        return <div>Loading...</div>; // 서버 사이드 렌더링 시에 표시할 컴포넌트 또는 메시지를 반환합니다.
    }

    // 좌표-주소 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();
    const [isMobile, setIsMobile] = useState<boolean | null>(null);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>({ lat: 35.149409, lng: 126.914957 });
    const [lng, setLng] = useState<number>(0);
    const [lat, setLat] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    // 제출 체크
    const [isCheck, setIsCheck] = useState(false);

    const handleIsMobileChanged = (mobile: boolean) => {
        setIsMobile(mobile);
    };
    // const clickPositions = () => {
    //     myCheck ? setMyCheck(false) : setMyCheck(true);
    //     // 좌표로 행정동 주소 정보를 요청합니다
    //     geocoder.coord2RegionCode(lng, lat, (result: any, status: any) => {
    //         if (status == 'OK') {
    //             const locationData = { lng, lat, RegionCode: result[0].region_3depth_name };
    //             setData(prevData => ({ ...prevData, location: locationData }));
    //             setIsLocationOn(false);
    //         }
    //     });
    // };
    const [myCheck, setMyCheck] = useState(true);
    const clickPosition = () => {
        // console.log(lat, lng, score);
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
                    const locationData = { lng, lat, RegionCode: '' };
                    // 좌표로 행정동 주소 정보를 요청합니다
                    geocoder.coord2RegionCode(lng, lat, (result: any, status: any) => {
                        if (status === kakao.maps.services.Status.OK) {
                            // 행정동 주소 정보를 가져오는 데에 성공한 경우
                            const regionCode = result[0].region_3depth_name;
                            console.log('행정동:', regionCode);

                            // locationData에 행정동 주소 정보 추가
                            locationData.RegionCode = regionCode;
                            setData(prevData => ({ ...prevData, location: locationData }));
                            onSubmit({ ...data, location: locationData });
                            // console.log('로케이션에서', locationData);
                            setIsLocationOn(false);
                        } else {
                            // 행정동 주소 정보를 가져오는 데에 실패한 경우
                            console.error('행정동 주소 정보를 가져오는 데에 실패했습니다.');
                        }
                    });
                } else if (result.isDenied) {
                    // 취소 버튼 클릭 시 처리할 로직
                }
            });
        } else if (score >= 5 && score < 7.5) {
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
                    // 확인 버튼 클릭 시 처리할 로직
                    const locationData = { lng, lat, RegionCode: '' };
                    // 좌표로 행정동 주소 정보를 요청합니다
                    geocoder.coord2RegionCode(lng, lat, (result: any, status: any) => {
                        if (status === kakao.maps.services.Status.OK) {
                            // 행정동 주소 정보를 가져오는 데에 성공한 경우
                            const regionCode = result[0].region_3depth_name;
                            console.log('행정동:', regionCode);

                            // locationData에 행정동 주소 정보 추가
                            locationData.RegionCode = regionCode;
                            setData(prevData => ({ ...prevData, location: locationData }));
                            onSubmit({ ...data, location: locationData });
                            // console.log('로케이션에서', locationData);
                            setIsLocationOn(false);
                        } else {
                            // 행정동 주소 정보를 가져오는 데에 실패한 경우
                            console.error('행정동 주소 정보를 가져오는 데에 실패했습니다.');
                        }
                    });
                } else if (result.isDenied) {
                    // 취소 버튼 클릭 시 처리할 로직
                }
            });
        } else if (score >= 2.5 && score < 5) {
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
                    // 확인 버튼 클릭 시 처리할 로직
                    const locationData = { lng, lat, RegionCode: '' };
                    // 좌표로 행정동 주소 정보를 요청합니다
                    geocoder.coord2RegionCode(lng, lat, (result: any, status: any) => {
                        if (status === kakao.maps.services.Status.OK) {
                            // 행정동 주소 정보를 가져오는 데에 성공한 경우
                            const regionCode = result[0].region_3depth_name;
                            console.log('행정동:', regionCode);

                            // locationData에 행정동 주소 정보 추가
                            locationData.RegionCode = regionCode;
                            setData(prevData => ({ ...prevData, location: locationData }));
                            onSubmit({ ...data, location: locationData });
                            // console.log('로케이션에서', locationData);
                            setIsLocationOn(false);
                        } else {
                            // 행정동 주소 정보를 가져오는 데에 실패한 경우
                            console.error('행정동 주소 정보를 가져오는 데에 실패했습니다.');
                        }
                    });
                } else if (result.isDenied) {
                    // 취소 버튼 클릭 시 처리할 로직
                }
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
                    // 확인 버튼 클릭 시 처리할 로직
                    const locationData = { lng, lat, RegionCode: '' };
                    // 좌표로 행정동 주소 정보를 요청합니다
                    geocoder.coord2RegionCode(lng, lat, (result: any, status: any) => {
                        if (status === kakao.maps.services.Status.OK) {
                            // 행정동 주소 정보를 가져오는 데에 성공한 경우
                            const regionCode = result[0].region_3depth_name;
                            console.log('행정동:', regionCode);

                            // locationData에 행정동 주소 정보 추가
                            locationData.RegionCode = regionCode;
                            setData(prevData => ({ ...prevData, location: locationData }));
                            onSubmit({ ...data, location: locationData });
                            // console.log('로케이션에서', locationData);
                            setIsLocationOn(false);
                        } else {
                            // 행정동 주소 정보를 가져오는 데에 실패한 경우
                            console.error('행정동 주소 정보를 가져오는 데에 실패했습니다.');
                        }
                    });
                } else if (result.isDenied) {
                    // 취소 버튼 클릭 시 처리할 로직
                }
            });
        }
    };

    useEffect(() => {
        const getLocation = () => {
            let watchId: number | null = null;

            if (navigator.geolocation) {
                const options = {
                    maximumAge: 0,
                };

                watchId = navigator.geolocation.watchPosition(
                    position => {
                        setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
                    },
                    error => {
                        console.error('Error getting position:', error);
                    },
                    options,
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }

            return () => {
                if (watchId !== null) {
                    navigator.geolocation.clearWatch(watchId);
                }
            };
        };

        getLocation();
        const intervalId = setInterval(getLocation, 10000); // 10 seconds

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const message = '이 페이지는 모바일 기기에서 최적화되어 있습니다. 모바일로 접속해주세요.';

    const [dots, setDots] = useState('');
    const check = true;
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
        <div className="w-full h-screen">
            <ResponsiveChecker message={message} onIsMobileChanged={handleIsMobileChanged} />
            <p>{isMobile}</p>
            {isMobile && (
                <>
                    {/* 나머지 페이지 내용 */}
                    {userLocation && (
                        <div className="p-4 font-bold h-[15vh] flex items-center justify-center ">
                            <div className="w-full">
                                <div className="flex justify-between h-fit text-xl">
                                    <div>
                                        <p>이웃과 만나서</p>
                                        <p>거래할 장소를 확인해주세요</p>
                                    </div>
                                    <div className="h-[35%]">
                                        <Image src={pin} alt="pin" />
                                    </div>
                                </div>
                                <p className="text-blue">안전한 세이프존에서 거래하는 것을 추천해요.</p>
                            </div>
                        </div>
                    )}
                    <div id="map" className="w-full h-[85vh] relative">
                        {userLocation && (
                            <KakaoMap
                                onCenter={(lat, lng, score) => {
                                    setLat(lat);
                                    setLng(lng);
                                    setScore(score);
                                }}
                                click={false}
                            />
                        )}
                        <div className="absolute bottom-10 z-10 w-full">
                            <button className="w-2/3 h-12 m-auto block rounded-xl text-center text-white text-xl  bg-blue" onClick={clickPosition}>
                                장소 확정
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default pickLocation;
