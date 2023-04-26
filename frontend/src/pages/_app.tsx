import '@/styles/globals.css';
import '@/styles/fonts/style.css';
import React from 'react';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className="bg-white ">
            <Component {...pageProps} />
        </div>
    );
}
