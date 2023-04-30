import React from 'react';
import Header from '../../components/Container/components/Header';
import Profile from '../../components/Card/Profile';
import { MenuData1, MenuData2 } from './MenuData';
import Link from 'next/link';
import Button from '../../components/Button';
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
                                <Link key={index} href={item.url} className={`text-[16px] ${index === 0 ? 'mt-[1rem]' : 'mt-[0.5rem]'}`}>
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                        <div className="flex flex-col mt-[2.3rem]">
                            <span className="font-bold text-[20px]">기타</span>
                            {MenuData2.map((item, index) => (
                                <Link key={index} href={item.url} className={`text-[16px] ${index === 0 ? 'mt-[1rem]' : 'mt-[0.5rem]'}`}>
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </Body>
                <Button.Round bgColor="blue" textColor="white" innerValue="대여하기" />
                <Button.Round bgColor="lightgray" textColor="black" innerValue="도서" />
                <Button.Round bgColor="lightgray" textColor="black" innerValue="여성잡화" />
                <Button.Round bgColor="lightgray" textColor="black" innerValue="가구/인테리어" />
                <br />
                <Button.SquareSm bgColor="red" textColor="white" innerValue="신고" />
                <br />
                <Button.Square bgColor="blue" textColor="white" innerValue="씨유 톡톡" />
                <br />
                <Button.SquareLg bgColor="blue" textColor="white" innerValue="선택완료" />
            </div>
        </Container>
    );
}

export default MyPage;
