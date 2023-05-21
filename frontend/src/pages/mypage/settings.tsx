// settings.tsx
import { axAuth } from '@/apis/axiosinstance';
import SquareLg from '@/components/Button/SquareLg';
import Container from '@/components/Container';
import Header from '@/components/Container/components/Header';
import ProfileImage from '@/components/UserAvatar';
import defaultUserImage from '@/images/default_user.png';
import pen from '@/images/pen.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userState } from 'recoil/user/atoms';
import Swal from 'sweetalert2';
import ResponsiveChecker from '@/components/ResponsiveChecker';
import KakaoMap from '@/components/Location/SetKakaoMap';
import pin from '@/images/location-pin.png';
import imageCompression from 'browser-image-compression';

function settings() {
    const [firstValue, setFirstValue] = useState<string>('');
    const [secondValue, setSecondValue] = useState<string>('');
    const [profileImg, setProfileImg] = useState<string>('');
    const [image, setImage] = useState<File | undefined>();
    const [index, setIndex] = useState<boolean>(false);
    const router = useRouter();
    const [user, setUser] = useRecoilState(userState);

    const [lng, setLng] = useState<number>(0);
    const [lat, setLat] = useState<number>(0);
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

    const changeSecondValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSecondValue(event.target.value);
    };

    const handleImageChange = (file: File) => {
        setImage(file);

        const imageUrl = URL.createObjectURL(file);
        setProfileImg(imageUrl);
    };
    useEffect(() => {
        localStorage.setItem('firstValue', firstValue);
    }, [firstValue]);

    useEffect(() => {
        localStorage.setItem('secondValue', secondValue);
    }, [secondValue]);

    useEffect(() => {
        if (profileImg) {
            localStorage.setItem('profileImg', profileImg);
        }
    }, [profileImg]);

    const resizeImage = async (file: File): Promise<Blob> => {
        try {
            const options = {
                maxSizeMB: 0.7,
                maxWidthOrHeight: 800,
                outputType: 'png', // PNG 형식으로 압축
                quality: 0.8, // 이미지 품질을 0.8로 설정
            };

            const compressedFile = await imageCompression(file, options);
            return compressedFile;
        } catch (error) {
            console.error('Error resizing image:', error);
            return file;
        }
    };

    const token = useRecoilValue(userState).accessToken;
    const setting = async () => {
        const submitData = {
            location: firstValue,
            description: secondValue,
        };

        const blob = new Blob([JSON.stringify(submitData)], {
            // type에 JSON 타입 지정
            type: 'application/json',
        });

        const formData = new FormData();
        formData.append('requestDto', blob);

        if (image) {
            const resizedImageBlob = await resizeImage(image);
            const resizedImageFile = new File([resizedImageBlob], image.name, { type: resizedImageBlob.type });
            formData.append('profileImg', resizedImageFile);
        }

        axAuth(token)({
            method: 'patch',
            url: '/user-service/auth/profile',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formData,
        }).then((res: any) => {
            setUser({
                ...user,
                location: res.data.data.location,
                mannerScore: res.data.data.mannerScore,
                nickname: res.data.data.nickname,
                profileImg: res.data.data.profileImg,
            });
            alert('프로필이 수정되었습니다!');
            router.push('/home');
            Swal.fire({
                title: '프로필 수정 완료',
                icon: 'success',
                confirmButtonText: '확인',
                timer: 2000, // 3초 뒤에 자동으로 닫히게 설정합니다.
                timerProgressBar: true, // 타이머 진행바를 표시합니다.
                willClose: () => {
                    Swal.showLoading();
                },
            }).then(result => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    router.push('/home');
                } else if (result.isConfirmed) {
                    router.push('/home');
                }
            });
        });
    };

    useEffect(() => {
        axAuth(token)({
            url: '/user-service/auth/profile',
        }).then(res => {
            setFirstValue(res.data.data.location);
            setSecondValue(res.data.data.description);
            setProfileImg(res.data.data.profileImg);
        });
    }, []);

    useEffect(() => {
        const geocoder = new kakao.maps.services.Geocoder();
        if (location) {
            geocoder.coord2RegionCode(location.lng, location.lat, (result: any, status: any) => {
                if (status == 'OK') {
                    setFirstValue(result[0].region_3depth_name);
                }
            });
        }
    }, [lng, lat, location]);

    const click = () => {
        setIndex(true);
    };

    const [containerHeight, setContainerHeight] = useState<number>(0);
    const [webContainerHeight, setWebContainerHeight] = useState<number>(0);
    const [mapHeight, setMapHeight] = useState<number>(0);

    useEffect(() => {
        const handleResize = () => {
            const windowHeight = window.innerHeight;
            const containerHeight = windowHeight - 100 - 32;
            setWebContainerHeight(containerHeight);
            const mapWindowHeight = window.innerHeight;
            const mapHeight = mapWindowHeight - 100 - 32 - 113.04;
            setMapHeight(mapHeight);
        };

        // 초기 로드 및 윈도우 크기 변경 이벤트에 대한 이벤트 핸들러 등록
        handleResize();
        window.addEventListener('resize', handleResize);

        // 컴포넌트 언마운트 시 이벤트 핸들러 제거
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const windowHeight = window.innerHeight;
            const containerHeight = windowHeight - 106;
            setContainerHeight(containerHeight);
        };

        // 초기 로드 및 윈도우 크기 변경 이벤트에 대한 이벤트 핸들러 등록
        handleResize();
        window.addEventListener('resize', handleResize);

        // 컴포넌트 언마운트 시 이벤트 핸들러 제거
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [isMobile, setIsMobile] = useState<boolean | null>(null);
    // const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>({ lat: 35.149409, lng: 126.914957 });

    const [score, setScore] = useState<number>(0);

    const handleIsMobileChanged = (mobile: boolean) => {
        setIsMobile(mobile);
    };

    const clickPosition = () => {
        if (lng != 0 && lat != 0) {
            Swal.fire({
                title: '동네설정',
                text: '이곳으로 설정하실건가요?',
                icon: 'success', // 성공, 에러, 경고 등의 아이콘을 선택할 수 있습니다.
                confirmButtonText: '확인', // 버튼 텍스트를 지정할 수 있습니다.
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: '취소',
            }).then(result => {
                if (result.isConfirmed) {
                    // 확인 버튼 클릭 시 처리할 로직
                    setLocation({ lat: lat, lng: lng });
                    setIndex(false);
                } else if (result.isDenied) {
                    // 취소 버튼 클릭 시 처리할 로직
                }
            });
        } else {
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
        }
    };

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

    const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

    useEffect(() => {
        const desktopQuery = window.matchMedia('(min-width:767px)');
        const mobileQuery = window.matchMedia('(max-width:767px)');

        const handleDesktopQuery = (event: MediaQueryListEvent) => {
            setIsDesktop(event.matches);
        };

        const handleMobileQuery = (event: MediaQueryListEvent) => {
            setIsMobile(event.matches);
        };

        desktopQuery.addEventListener('change', handleDesktopQuery);
        mobileQuery.addEventListener('change', handleMobileQuery);

        // 초기값 설정
        setIsDesktop(desktopQuery.matches);
        setIsMobile(mobileQuery.matches);

        return () => {
            desktopQuery.removeEventListener('change', handleDesktopQuery);
            mobileQuery.removeEventListener('change', handleMobileQuery);
        };
    }, []);

    // 로딩 중이거나 초기 상태일 때 출력할 내용
    if (isDesktop === null || isMobile === null) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="relative">
            {isDesktop && (
                <>
                    {!index && (
                        <>
                            <div className="px-[1.88rem] relative" style={{ height: webContainerHeight }}>
                                <div className="w-full mb-4 text-2xl font-bold pb-4">
                                    <p className="pl-4">프로필 수정</p>
                                </div>
                                <ProfileImage defaultImage={defaultUserImage} currentImage={profileImg} onChange={handleImageChange} />
                                <div className="mt-4">
                                    <p className="m-1 font-bold">동네설정</p>
                                    <div className="flex justify-between items-center bg-gray-200 p-2 rounded-xl" onClick={click}>
                                        <p>{firstValue ? firstValue : '내 동네 설정하기'} </p>
                                    </div>
                                    <p className="text-sm text-gray-400 font-bold w-full text-right">클릭하면 지도로 이동합니다</p>
                                </div>
                                <div className="mt-4">
                                    <p className="m-1 font-bol">소개 메세지</p>
                                    <div className="flex bg-gray-200 p-2 rounded-xl">
                                        <textarea className="w-[99%] bg-transparent" value={secondValue} onChange={changeSecondValue} />
                                        <Image src={pen} alt="pen" className="m-1 h-3 w-3" />
                                    </div>
                                </div>
                                <button className="absolute bottom-1 right-3 w-1/3 h-10 rounded-lg  bg-blue text-white m-auto" onClick={setting}>
                                    수정 완료
                                </button>
                            </div>
                        </>
                    )}
                    {index && (
                        <div className="w-full h-full">
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
                                    <p className="text-blue">안전한 세이프존에서 거래하는 것을 추천해요.</p>
                                </div>
                            </div>
                            <div id="map" className="w-full relative" style={{ height: mapHeight }}>
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
                        </div>
                    )}
                </>
            )}
            {isMobile && (
                <>
                    {!index && (
                        <>
                            <Header title="프로필 수정"></Header>
                            <div className="px-[1.88rem] " style={{ height: containerHeight }}>
                                <ProfileImage defaultImage={defaultUserImage} currentImage={profileImg} onChange={handleImageChange} />
                                <div className="mt-4">
                                    <p className="m-1 font-bold">동네설정</p>
                                    <div className="flex justify-between items-center bg-gray-200 p-2 rounded-xl" onClick={click}>
                                        <p>{firstValue ? firstValue : '내 동네 설정하기'} </p>
                                    </div>
                                    <p className="text-sm text-gray-400 font-bold w-full text-right">클릭하면 지도로 이동합니다</p>
                                </div>
                                <div className="mt-4">
                                    <p className="m-1 font-bol">소개 메세지</p>
                                    <div className="flex bg-gray-200 p-2 rounded-xl">
                                        <textarea className="w-[95%] bg-transparent" value={secondValue} onChange={changeSecondValue} />
                                        <Image src={pen} alt="pen" className="m-1 h-3 w-3" />
                                    </div>
                                </div>
                            </div>
                            <SquareLg divClass="absolute bottom-1 w-full px-[1.88rem]" bgColor="blue" textColor="white" innerValue="수정 완료" onClick={setting} />
                        </>
                    )}
                    {index && (
                        <div className="w-full h-screen">
                            <ResponsiveChecker message={message} onIsMobileChanged={handleIsMobileChanged} />
                            <p>{isMobile}</p>
                            {isMobile && (
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
                                            <p className="text-blue">안전한 세이프존에서 거래하는 것을 추천해요.</p>
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
                        </div>
                    )}
                </>
            )}
        </Container>
    );
}

export default settings;
