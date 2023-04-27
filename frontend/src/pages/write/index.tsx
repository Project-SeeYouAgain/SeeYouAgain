import Navbar from '@/components/Container/components/Navbar';
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Button from '@/components/Button';
import { useRouter } from 'next/router';

import ImageUpload from '@/components/ImageUpload';
import Container from '@/components/Container';
import Body from '@/components/Container/components/Body';
import CloseHeader from '@/components/Container/components/CloseHeader';

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
    return (
        <div className="bg-white">
            {isDesktop && <div>데스크탑화면</div>}
            {isMobile && data && (
                <Container>
                    <Body>
                        {/* 제목 및 상단 */}
                        <CloseHeader title="글 작성하기" onClose={handleClose}></CloseHeader>
                        {/* 입력 내용 */}
                        <div className="text-left">
                            {/* 글유형 */}
                            <div>
                                <p className="mb-[1rem] font-semibold"> 글 유형</p>
                                <Button type="button" buttonType="Cate2">
                                    구해요
                                </Button>
                            </div>
                            {/* 이미지 */}
                            <div className="mt-[1rem] ">
                                <p className="mb-[1rem] font-semibold"> 상품 이미지</p>
                                <ImageUpload />
                            </div>
                            {/* 제목 */}
                            <div className="mt-[1rem] ">
                                <p className="mb-[1rem] font-semibold"> 제목</p>
                            </div>
                        </div>
                        <Button type="button" buttonType="LargeSubmit">
                            제출 완료
                        </Button>
                    </Body>
                    <Navbar />
                </Container>
            )}
        </div>
    );
}

export default Write;
