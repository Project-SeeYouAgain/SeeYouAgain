import React, { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import '@/styles/globals.css';
import '@/styles/fonts/style.css';
import type { AppProps } from 'next/app';

import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/DatePicker.css';
import Router from 'next/router';
import lodinglogo from '@/images/lodinglogo.gif';
import Image from 'next/image';

export default function App({ Component, pageProps }: AppProps) {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleStart = () => setIsLoading(true);
        const handleComplete = () => setIsLoading(false);

        Router.events.on('routeChangeStart', handleStart);
        Router.events.on('routeChangeComplete', handleComplete);
        Router.events.on('routeChangeError', handleComplete);

        return () => {
            Router.events.off('routeChangeStart', handleStart);
            Router.events.off('routeChangeComplete', handleComplete);
            Router.events.off('routeChangeError', handleComplete);
        };
    }, []);
    const [theme, setTheme] = useState<string>('');

    useEffect(() => {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setTheme(systemTheme);
    }, []);

    useEffect(() => {
        if (theme) {
            document.documentElement.classList.remove('light', 'dark');
            document.documentElement.classList.add(theme);
        }
    }, [theme]);
    const [dots, setDots] = useState('');
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (dots.length < 3) {
                setDots(prevDots => prevDots + '.');
            } else {
                setDots('');
            }
        }, 500);
        return () => clearInterval(intervalId);
    }, [dots]);
    return (
        <div className="bg-white relative">
            <RecoilRoot>
                {isLoading && (
                    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center text-2xl font-bold z-50 bg-gray-300/70">
                        <div className="relative">
                            <Image src={lodinglogo} alt="lodinglogo" className="m-auto w-full" />
                            <p className="w-1/2 absolute left-1/3">{`로딩중${dots}`}</p>
                        </div>
                    </div>
                )}
                <Component {...pageProps} />
            </RecoilRoot>
        </div>
    );
}
