import { useState, useEffect } from 'react';
import { axBase } from '../../apis/axiosinstance';
import Container from '@/components/Container';
import Body from '@/components/Container/components/Body';
import Carousel from '../../components/Card/ImageCarousel';
import shield from '../../assets/icons/safezone.png';
import Image from 'next/image';
import DeclareButton from '../../components/Button/SquareSm';
import RoundButton from '../../components/Button/Round';

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
}

function Detail() {
    const [data, setData] = useState<ProductData>();
    useEffect(() => {
        const productId = window.location.pathname;
        const url = `/product-service/auth${productId}`;
        axBase({ url })
            .then(res => {
                setData(res.data.data);
            })
            .catch(err => console.log(err));
    }, []);

    if (data !== undefined) {
        return (
            <Container>
                <Carousel imgUrl={data.productImgList}></Carousel>
                <Body>
                    <div>
                        <div className="font-bold">
                            {data.isSafe === true ? <Image src={shield} alt="세이프존 표시" className="w-[1.5rem]" /> : null}
                            {data.title}
                        </div>
                        <div>
                            <span>{data.location}</span>
                            <span>{data.nickname}</span>
                            <span>{data.score}</span>
                            <DeclareButton bgColor="red" textColor="white" innerValue="신고" />
                        </div>
                        <div>
                            <span>{data.price}원</span>
                            <span>/일</span>
                        </div>
                        <div>
                            <RoundButton bgColor="darkgray" textColor="black" innerValue={data.category} />
                        </div>
                        <div>{data.description}</div>
                        <div>{data.tag}</div>
                    </div>
                    <div></div>
                </Body>
            </Container>
        );
    } else {
        return <div>로딩중입니다.</div>;
    }
}

export default Detail;
