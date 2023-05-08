import { useState, useEffect } from 'react';
import { axBase } from '../../apis/axiosinstance';
import Container from '@/components/Container';
import Body from '@/components/Container/components/Body';
import Carousel from '../../components/Card/ImageCarousel';
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

interface ProductData {
    title: string;
    price: number;
    location: string;
    category: string;
    userId: number;
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
    // isCart: boolean;
}

function Detail() {
    const [data, setData] = useState<ProductData>();
    useEffect(() => {
        const productId = window.location.pathname;
        const url = `/product-service/auth${productId}`;
        axBase({ url })
            .then(res => {
                console.log(res.data.data);
                setData(res.data.data);
            })
            .catch(err => console.log(err));
    }, []);

    const [menuState, setMenuState] = useState<number>(1);

    function SelectMenu(data: number) {
        setMenuState(data);
    }

    if (data !== undefined) {
        return (
            <Container>
                <Carousel imgUrl={data.productImgList}></Carousel>
                <Body>
                    <div className="mt-[2rem]">
                        <div className="font-bold flex text-[1.3rem]">
                            {data.isSafe === true ? <Image src={shield} alt="세이프존 표시" className="w-[2rem] mr-[0.7rem]" /> : null}
                            {data.title}
                        </div>
                        <div className="flex items-center my-[0.5rem] text-[grey]">
                            <span>{data.location}</span>
                            <BsDot size={24} />
                            <span>{data.nickname}</span>
                            <MannerScore score={data.mannerScore} />
                            <DeclareButton bgColor="red" textColor="white" innerValue="신고" className="ml-[0.5rem]" />
                        </div>
                        <div className="mb-[0.5rem]">
                            <span className="font-bold text-[1.3rem]">{data.price}원</span>
                            <span>/일</span>
                        </div>
                        <div className="mb-[1.5rem]">
                            <RoundButton bgColor="lightgray" textColor="black" innerValue={data.category} />
                        </div>
                        <div className="mb-[1.5rem]">{data.description}</div>
                        <div className="mb-[2rem]">
                            {data.tag.map((value, index) => (
                                <span key={index} className="text-[#BDBDBD]">
                                    #{value}{' '}
                                </span>
                            ))}
                        </div>
                        <Menu onSelectMenu={SelectMenu} title1={'예약일정'} title2={'거래장소'} title3={'대여후기'} />
                        {menuState === 1 ? (
                            <div>
                                <Calender reservationPeriods={data.reservation} availablePeriod={{ startDate: data.startDate, endDate: data.endDate }} />
                            </div>
                        ) : menuState === 2 ? (
                            <div>
                                <div></div>
                            </div>
                        ) : (
                            <div>
                                <div></div>
                            </div>
                        )}
                    </div>
                </Body>
                <footer className="fixed bottom-0 border-t-2 w-[100vw] h-[3rem] flex items-center justify-evenly bg-white">
                    {/* {isCart === true ? <AiFillHeart color="blue" size={34} /> : <AiOutlineHeart color="blue" size={34} />} */}
                    <Square bgColor="blue" textColor="white" innerValue="예약하기" className="text-[1.3rem] px-[2rem] py-[0.3rem] rounded-[0.5rem]" />
                    <Square bgColor="white" textColor="blue" innerValue="채팅하기" className="text-[1.3rem] px-[1rem] py-[0.3rem] rounded-[0.5rem] border-[#5669FF] border-2" />
                </footer>
            </Container>
        );
    } else {
        return <div>로딩중입니다.</div>;
    }
}

export default Detail;
