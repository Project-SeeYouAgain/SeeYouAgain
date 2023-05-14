import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// 아이콘
import { AiOutlineLeft } from 'react-icons/ai';
import { RiAlarmWarningLine } from 'react-icons/ri';

// 모달
import ReportModal from '../../../Modal/ReportModal';

interface DetailProps {
    title: string;
    url?: string;
}

function DetailHeader({ title, url = undefined }: DetailProps) {
    const router = useRouter();

    // 뒤로가기
    const goToHome = () => {
        if (url) {
            router.push(url);
        }
    };
    const handleBack = () => {
        router.back();
    };

    // 스크롤 위치 저장
    const [scrollY, setScrollY] = useState(0);

    // 스크롤 위치에 따른 투명도 변경
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // 신고 모달
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>('');
    function handleReport() {
        setIsModalOpen(true);
        setModalMessage(title);
    }

    const backgroundColor = scrollY < 200 ? 'rgba(255, 255, 255, 0.5)' : 'white';
    const textColor = scrollY < 200 ? 'white' : 'blue';

    return (
        <div className="fixed top-0 z-30">
            <div className={`flex  h-[4.5rem] w-[100vw] justify-between items-center text-center text-${textColor} pl-[5vw] pr-[5vw] bg-${backgroundColor} transition duration-300 ease-in-out`}>
                {url && <AiOutlineLeft size={23} onClick={goToHome} />}
                {!url && <AiOutlineLeft size={23} onClick={handleBack} />}
                <RiAlarmWarningLine size={23} onClick={handleReport} />
            </div>
            <ReportModal isModalOpen={isModalOpen} message={modalMessage} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
export default DetailHeader;
