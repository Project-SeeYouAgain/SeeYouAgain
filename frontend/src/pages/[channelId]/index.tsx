import { useState, useEffect } from 'react';
import { axBase, axAuth } from '../../apis/axiosinstance';
import Container from '@/components/Container';
import Body from '@/components/Container/components/Body';
import Carousel from '../../components/Card/ImageCarousel';
import WebCarousel from '../../components/Card/WebImageCarousel';
import shield from '../../assets/icons/safezone.png';
import Image from 'next/image';
import DeclareButton from '../../components/Button/SquareSm';
import RoundButton from '../../components/Button/Round';
import { BsDot } from 'react-icons/bs';
import MannerScore from '../../components/Card/MannerScore';
import Menu from '../../components/Card/Menu';
import Square from '../../components/Button/Square';
import { AiOutlineHeart, AiFillHeart, AiOutlineConsoleSql } from 'react-icons/ai';
import Calender from '../../components/Card/Calender';
import KakaoMapMini from '../../components/Location/KakaoMapMini';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user/atoms';
import ReviewList from '../../components/Card/ReviewList';
import WebNavbar from '@/components/Container/components/WebNavbar';

import { AiOutlineLeft } from 'react-icons/ai';
import DetailHeader from '@/components/Container/components/DetailHeader';

interface ProductData {
    title: string;
    price: number;
    location: string;
    category: string;
    ownerId: number;
    nickname: string;
    productImgList: string[];
    description: string;
    tag: string[];
    startDate: string;
    endDate: string;
    reservation: { startDate: string; endDate: string }[];
    isSafe: boolean;
    score: number;
    mannerScore: number;
    isCart: boolean;
    lng: number;
    lat: number;
    reviewListSize: number;
}

function Detail() {
    const router = useRouter();
    const [data, setData] = useState<ProductData>();
    const [isHeartFill, setIsHeartFill] = useState<boolean>(false);
    const token = useRecoilValue(userState).accessToken;
    const myUserId = Number(useRecoilValue(userState).id);
    const [menuState, setMenuState] = useState<number>(1);
    const [product, setProduct] = useState<number>(1);

    useEffect(() => {
        const productId = Number(window.location.pathname.substring(1));
        setProduct(productId);
        const url = `/product-service/auth/${productId}`;
        axBase(token)({ url })
            .then(res => {
                console.log(res.data.data);
                setData(res.data.data);
                setIsHeartFill(res.data.data.isCart);
            })
            .catch(err => console.log(err));
    }, [isHeartFill]);

    function GoChatRoom() {
        const url = `/chatting-service/auth/channel`;
        const productId = Number(window.location.pathname.substring(1));
        if (data) {
            console.log(data.ownerId);
            const myData = {
                productId: productId,
                ownerId: data.ownerId,
            };
            axAuth(token)({ method: 'post', url: url, data: myData })
                .then(res => {
                    router.push(`/chat/${res.data.data}`);
                })
                .catch(err => console.log(err));
        }
    }

    function GoBook() {
        const url = `/chatting-service/auth/channel`;
        const productId = Number(window.location.pathname.substring(1));
        if (data) {
            console.log(data.ownerId);
            const myData = {
                productId: productId,
                ownerId: data.ownerId,
            };
            axAuth(token)({ method: 'post', url: url, data: myData })
                .then(res => {
                    router.push(`/chat/${res.data.data}/book/${product}`);
                })
                .catch(err => console.log(err));
        }
    }

    function ClickHeart() {
        const productId = Number(window.location.pathname.substring(1));
        const url = `/product-service/auth/cart/${productId}`;
        if (isHeartFill === false) {
            axAuth(token)({ method: 'post', url: url })
                .then(() => {
                    setIsHeartFill(!isHeartFill);
                })
                .catch(err => console.log(err));
        } else {
            axAuth(token)({ method: 'delete', url: url })
                .then(() => {
                    setIsHeartFill(!isHeartFill);
                })
                .catch(err => console.log(err));
        }
    }

    function SelectMenu(state: number) {
        setMenuState(state);
    }

    const dragThreshold = 20;

    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const handleDragStart = (e: any) => {
        const touch = e.touches ? e.touches[0] : e;
        setDragStart({ x: touch.clientX, y: touch.clientY });
    };

    const handleDragEnd = (e: any) => {
        const touch = e.changedTouches ? e.changedTouches[0] : e;
        const deltaX = touch.clientX - dragStart.x;
        const deltaY = touch.clientY - dragStart.y;

        if (Math.abs(deltaY) > Math.abs(deltaX)) {
            // Ignore vertical drag
            return;
        }
        if (Math.abs(deltaX) < dragThreshold) {
            return;
        }

        if (deltaX > -90) {
            setMenuState(prev => (prev === 1 ? 3 : prev - 1));
        } else if (deltaX < 90) {
            setMenuState(prev => (prev === 3 ? 1 : prev + 1));
        }
    };
    const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

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

    if (data !== undefined) {
        return (
            <>
                {isDesktop && (
                    <div className="w-full">
                        <WebNavbar />
                        <div className="px-[10rem] mt-[100px]">
                            <RoundButton bgColor="lightgrey" textColor="black" innerValue={data.category} className="mr-2" />
                        </div>
                        <div className=" px-[10rem] flex mt-4">
                            <div className="relative ">
                                <WebCarousel imgUrl={data.productImgList} />
                                <div className="w-[40px] absolute top-3 z-10 left-3 flex items-center justify-center">
                                    {data.isCart === true ? <AiFillHeart color="blue" size={34} onClick={ClickHeart} /> : <AiOutlineHeart color="blue" size={34} onClick={ClickHeart} />}
                                </div>
                            </div>
                            <div className="px-[1.88rem] flex-grow">
                                <div className="font-semibold flex items-center text-2xl">{data.title}</div>
                                <div className="flex items-center text-[grey] my-2">
                                    <span className="text-[.9rem]">{data.location}</span>
                                    <BsDot size={24} />
                                    <span className="mr-[1rem] ">{data.nickname}</span>
                                    <MannerScore score={data.mannerScore} />
                                </div>
                                <div className="flex justify-between border-b-4 border-solid border-black pb-2">
                                    <span>
                                        <span className="font-bold  dark:text-black text-2xl">{data.price.toLocaleString('ko-KR')}원</span>
                                        <span>/일</span>
                                    </span>
                                    {data.isSafe === true ? <Image src={shield} alt="세이프존 표시" className="w-[2rem] mr-[0.7rem]" /> : null}
                                </div>

                                <div className=" dark:text-black min-h-[100px]">{data.description}</div>
                                <div className="w-full grid grid-cols-3 gap-3 mt-4">
                                    <div></div>
                                    <button className="bg-blue text-white rounded-[0.5rem] w-full h-[2.5rem]" onClick={GoBook}>
                                        예약하기
                                    </button>
                                    <button className="bg-white text-blue  rounded-[0.5rem] w-full border-[#5669FF] border-[.1rem]" onClick={GoChatRoom}>
                                        채팅하기
                                    </button>
                                </div>
                            </div>
                            <div className="w-[200px]">
                                <p className="-w-full border-b-2 border-solid">태그</p>
                                {data.tag.map((value, index) => (
                                    <span key={index} className="text-[#BDBDBD]">
                                        #{value}{' '}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="w-full px-[10rem] pt-8 grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-xl font-bold ml-2 mb-2">대여일정</p>
                                <div className="w-full h-[300px]">
                                    <Calender reservationPeriods={data.reservation} availablePeriod={{ startDate: data.startDate, endDate: data.endDate }} />
                                </div>
                            </div>
                            <div>
                                <p className="text-xl font-bold ml-2 mb-2">거래장소</p>
                                <div className="w-full h-[300px] aspect-[4/3] relative">
                                    <KakaoMapMini lat={data.lat} lng={data.lng} />
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-[10rem] mt-8">
                            <p className="text-xl font-bold pl-2 pb-2 w-full border-b-4 border-solid border-black">대여 후기</p>
                            <div className="py-4">
                                <ReviewList productId={product} reviewListSize={data.reviewListSize} />
                            </div>
                        </div>
                    </div>
                )}
                {isMobile && (
                    <Container>
                        <DetailHeader title={data.title} url={'/home'} />
                        <Carousel imgUrl={data.productImgList}></Carousel>
                        <div className="px-[1.88rem] mt-8">
                            <div className="font-semibold flex text-[1.2rem]">
                                {data.isSafe === true ? <Image src={shield} alt="세이프존 표시" className="w-[2rem] mr-[0.7rem]" /> : null}
                                {data.title}
                            </div>
                            <div className="flex items-center my-[0.5rem]  text-[grey]">
                                <span className="text-[.9rem]">{data.location}</span>
                                <BsDot size={24} />
                                <span className="mr-[1rem] text-[.9rem]">{data.nickname}</span>
                                <MannerScore score={data.mannerScore} />
                            </div>
                            <div className="mb-[0.5rem]">
                                <span className="font-bold text-[1.3rem] dark:text-black">{data.price.toLocaleString('ko-KR')}원</span>
                                <span>/일</span>
                            </div>
                            <div className="mb-[1.5rem]">
                                <RoundButton bgColor="lightgrey" textColor="black" innerValue={data.category} />
                            </div>
                            <div className="mb-[1.5rem] dark:text-black">{data.description}</div>
                            <div className="mb-[1.5rem]">
                                {data.tag.map((value, index) => (
                                    <span key={index} className="text-[#BDBDBD]">
                                        #{value}{' '}
                                    </span>
                                ))}
                            </div>
                            <div className="w-full pb-8 " onDragStart={handleDragStart} onDragEnd={handleDragEnd} onTouchStart={handleDragStart} onTouchEnd={handleDragEnd}>
                                <Menu onSelectMenu={SelectMenu} dragMenu={menuState} title1={'예약일정'} title2={'거래장소'} title3={'대여후기'} />
                                {menuState === 1 ? (
                                    <div className="h-[273.78px] w-full">
                                        <Calender reservationPeriods={data.reservation} availablePeriod={{ startDate: data.startDate, endDate: data.endDate }} />
                                    </div>
                                ) : menuState === 2 ? (
                                    <div className="flex  justify-center w-[100%] aspect-[4/3] relative h-[273.78px]">
                                        <div className="absolute w-[100%] aspect-[4/3] z-0">
                                            <KakaoMapMini lat={data.lat} lng={data.lng} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="min-h-[273.78px]">
                                        <ReviewList productId={product} reviewListSize={data.reviewListSize} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="sticky bottom-0 border-t border-solid w-full h-[4rem] flex px-7 items-center bg-white">
                            <div className="w-[40px] flex items-center justify-center">
                                {data.isCart === true ? <AiFillHeart color="blue" size={34} onClick={ClickHeart} /> : <AiOutlineHeart color="blue" size={34} onClick={ClickHeart} />}
                            </div>
                            <div className="flex-grow pl-1 grid grid-cols-2 gap-2">
                                <button className="bg-blue text-white rounded-[0.5rem] w-full h-[2.5rem]" onClick={GoBook}>
                                    예약하기
                                </button>
                                <button className="bg-white text-blue  rounded-[0.5rem] w-full border-[#5669FF] border-[.1rem]" onClick={GoChatRoom}>
                                    채팅하기
                                </button>
                            </div>
                        </div>
                    </Container>
                )}
            </>
        );
    }
}

export default Detail;
