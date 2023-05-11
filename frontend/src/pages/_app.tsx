import '@/styles/globals.css';
import '@/styles/fonts/style.css';
import React, { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import type { AppProps } from 'next/app';

import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/DatePicker.css';

export default function App({ Component, pageProps }: AppProps) {
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
    return (
        <div className="bg-white ">
            <RecoilRoot>
                <Component {...pageProps} />
            </RecoilRoot>
        </div>
    );
}
