import '@/styles/globals.css';
import '@/styles/fonts/style.css';
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Navbar from '@/components/Navbar/Navbar';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
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
                    <div className="ml-[1.8rem] mr-[1.8rem] mt-[1.8rem]">
                        <Component {...pageProps} />
                    </div>
                    <div>
                        <Navbar />
                    </div>
                </div>
            )}
        </div>
    );
}
