import '@/styles/globals.css';
import '@/styles/fonts/style.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            disable: 'mobile',
        });
    }, []);
    return <Component {...pageProps} />;
}
