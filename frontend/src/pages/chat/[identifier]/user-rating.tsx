import React, { useState } from 'react';
import styles from './userLocation.module.scss';
import Container from '@/components/Container';
import { AiOutlineClose, AiFillCamera } from 'react-icons/ai';
import Body from '@/components/Container/components/Body';

import StarRating from '@/components/StarRating';
import SquareLg from '@/components/Button/SquareLg';
import Image from 'next/image';
import Header from '@/components/Container/components/Header';
import health from '@/images/health-app.png';
import boost from '@/images/boost-app.png';
import music from '@/images/music-app.png';
import classNames from 'classnames';

function UserRating() {
    const name = '장성햄최';

    const handleRatingChange = (rating: number) => {
        console.log(`별점이 변경되었습니다: ${rating}`);
    };
    const [first, setFirst] = useState(false);
    const [second, setSecond] = useState(false);
    const [third, setThird] = useState(false);
    return (
        <Container>
            <Header title="" />
            <Body className="px-[1.88rem]">
                <div className="text-center py-4 pt-12 pb-8 text-xl font-bold">
                    <p>{name}과의 거래, 어떠셨나요?</p>
                    <p className="text-gray-400">다른 이용자를 위해 평가해주세요!</p>
                </div>
                <StarRating maxRating={5} onChange={handleRatingChange} />
                <div className="flex justify-between my-12 text-center text-blue font-bold text-sm whitespace-nowrap">
                    <div
                        className="w-[28%]"
                        onClick={() => {
                            setFirst(!first);
                        }}
                    >
                        <Image src={health} alt="health" className={classNames('w-full rounded-3xl', { [styles.clickedImage]: first })} />
                        <p className="mt-4">친절해요</p>
                    </div>
                    <div
                        className="w-[28%]"
                        onClick={() => {
                            setSecond(!second);
                        }}
                    >
                        <Image src={boost} alt="boost" className={classNames('w-full rounded-3xl', { [styles.clickedImage]: second })} />
                        <p className="mt-4">응답이 빨라요</p>
                    </div>
                    <div
                        className="w-[28%]"
                        onClick={() => {
                            setThird(!third);
                        }}
                    >
                        <Image src={music} alt="music" className={classNames('w-full rounded-3xl', { [styles.clickedImage]: third })} />
                        <p className="mt-4">약속을 잘 지켜요</p>
                    </div>
                </div>
                <SquareLg bgColor="blue" textColor="white" innerValue="작성 완료" className="mt-4" />
            </Body>
        </Container>
    );
}

export default UserRating;
