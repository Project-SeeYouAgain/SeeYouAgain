import Navbar from '@/components/Navbar/Navbar';
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

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
    // 이미지
    const [image, setImage] = useState<any>();
    const [imgPreview, setImgPreview] = useState<any>();
    const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImage(e.target.files);
    };
    return (
        <div className="bg-white">
            {isDesktop && <div>데스크탑화면</div>}
            {isMobile && data && (
                <div>
                    {/* 제목 */}
                    <div>글 작성하기</div>
                </div>
            )}
        </div>
    );
}

export default Write;
