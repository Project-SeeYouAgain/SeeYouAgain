import '@/styles/globals.css';
import '@/styles/fonts/style.css';
import React from 'react';
import { RecoilRoot } from 'recoil';
import type { AppProps } from 'next/app';

import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/DatePicker.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className="bg-white ">
            <RecoilRoot>
                <Component {...pageProps} />
            </RecoilRoot>
        </div>
    );
}
