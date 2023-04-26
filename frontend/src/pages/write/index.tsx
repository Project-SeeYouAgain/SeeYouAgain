import Navbar from '@/components/Navbar/Navbar';
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Button from '@/components/Button';

import ImageUpload from '@/components/ImageUpload';

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

    return (
        <div className="bg-white">
            {isDesktop && <div>데스크탑화면</div>}
            {isMobile && data && (
                <div>
                    {/* 제목 및 상단 */}
                    <div className="text-center">
                        <div className="text-[1.2rem] font-semibold text-blue">글 작성하기</div>
                    </div>

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
                </div>
            )}
        </div>
    );
}

export default Write;
