import Navbar from '@/components/Container/components/Navbar';
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Button from '@/components/Button';
import { useRouter } from 'next/router';

import ImageUpload from '@/components/ImageUpload';
import Container from '@/components/Container';
import Body from '@/components/Container/components/Body';
import CloseHeader from '@/components/Container/components/CloseHeader';
import TextInput from './components/textinput';
import Category from './components/Category';

function Write() {
    const [data, setData] = useState<boolean>(false);
    useEffect(() => {
        setData(true);
    }, []);
    // 미디어쿼리
    const isDesktop: boolean = useMediaQuery({
        query: '(min-width:1024px)',
    });
    const isMobile: boolean = useMediaQuery({
        query: '(max-width:767px)',
    });
    // 페이지 닫기
    const router = useRouter();

    const handleClose = () => {
        // 글 작성을 중단하시겠습니까? alert 하기
        // 이전페이지로 이동하기
        router.back();
    };
    // 글 유형 선택 (빌려줘요: 0 구해요 : 1)
    const [isRenter, setIsRenter] = useState(false);
    function onHandleData() {
        setIsRenter(!isRenter);
    }
    return (
        <div className="bg-white ">
            {isDesktop && <div>데스크탑화면</div>}
            {isMobile && data && (
                <Container>
                    {/* 제목 및 상단 */}
                    <Body>
                        <CloseHeader title="글 작성하기" onClose={handleClose}></CloseHeader>
                        {/* 입력 내용 */}
                        <div className="text-left ">
                            {/* 글유형 */}
                            <div>
                                <p className="mb-[1.2rem] font-bold text-[1.2rem] "> 글 유형</p>
                            </div>
                            <div className="flex">
                                <div className="mr-[1rem]">
                                    {!isRenter && <Button.Round bgColor="blue" textColor="white" innerValue="구해요" />}
                                    {isRenter && <Button.Round bgColor="lightgray" textColor="black" innerValue="구해요" onClick={onHandleData} />}
                                </div>
                                <div>
                                    {!isRenter && <Button.Round bgColor="lightgray" textColor="black" innerValue="빌려줘요" onClick={onHandleData} />}
                                    {isRenter && <Button.Round bgColor="blue" textColor="white" innerValue="빌려줘요" />}
                                </div>
                            </div>
                            {/* 이미지 */}
                            <div className="mt-[1rem] ">
                                <p className="mb-[1rem] font-bold text-[1.2rem] "> 상품 이미지</p>
                                <ImageUpload />
                            </div>
                            {/* 제목/대여가격/설명/일정 */}
                            <div className="mt-[1rem] ">
                                <TextInput />
                            </div>
                            {/* 카테고리 */}
                            <div>
                                <p className="mb-[1.2rem] font-bold text-[1.2rem] "> 카테고리 </p>
                                <Category></Category>
                            </div>
                            {/* 태그 */}
                            <div>
                                <p className="mb-[1.2rem] font-bold text-[1.2rem] "> 태그 </p>
                            </div>
                        </div>
                    </Body>
                    <Navbar />
                </Container>
            )}
        </div>
    );
}

export default Write;
