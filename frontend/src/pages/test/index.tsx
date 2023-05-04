import Navbar from '@/components/Container/components/Navbar';
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import CheckReservation from '@/components/CheckReservation';

function Test() {
    const [data, setData] = useState<boolean>(false);
    useEffect(() => {
        setData(true);
    }, []);

    const isDesktop: boolean = useMediaQuery({
        query: '(min-width:1024px)',
    });
    const isMobile: boolean = useMediaQuery({
        query: '(max-width:767px)',
    });
    return (
        <div className="bg-gray-500 h-screen">
            <p>여기는 test 페이지</p>
            {isDesktop && <div>데스크탑화면</div>}
            {isMobile && data && (
                <div>
                    <div className="m-auto w-4/5 bg-white rounded-xl border-solid border-2">
                        <CheckReservation />
                    </div>
                    <div>
                        <Navbar />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Test;
