import React from 'react';
import Header from '../../components/Container/components/Header';
import Profile from '../../components/Card/Profile';
import { MenuData1, MenuData2 } from '../../data/MenuData';
import Link from 'next/link';
import Container from '@/components/Container';
import Body from '@/components/Container/components/Body';

function MyPage() {
    return (
        <Container>
            <div>
                <Header title="마이페이지" />
                <Body className="mt-[3rem]">
                    <Profile />
                    <div className="mt-[2.3rem]">
                        <div className="flex flex-col">
                            <span className="font-bold text-[20px]">나의 거래</span>
                            {MenuData1.map((item, index) => (
                                <span className={`text-[16px] ${index === 0 ? 'mt-[1rem]' : 'mt-[0.5rem]'}`}>
                                    <Link key={index} href={item.url}>
                                        {item.title}
                                    </Link>
                                </span>
                            ))}
                        </div>
                        <div className="flex flex-col mt-[2.3rem]">
                            <span className="font-bold text-[20px]">기타</span>
                            {MenuData2.map((item, index) => (
                                <span className={`text-[16px] ${index === 0 ? 'mt-[1rem]' : 'mt-[0.5rem]'}`}>
                                    <Link key={index} href={item.url}>
                                        {item.title}
                                    </Link>
                                </span>
                            ))}
                        </div>
                    </div>
                </Body>
            </div>
        </Container>
    );
}

export default MyPage;
