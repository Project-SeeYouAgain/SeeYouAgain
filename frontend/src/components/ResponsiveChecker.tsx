// components/ResponsiveChecker.tsx
import { useWindowSize } from './hooks/useWindowSize';
import { useEffect, useState } from 'react';
import logo from '@/assets/icons/phone.png';
import Image from 'next/image';

const MOBILE_MAX_WIDTH = 768;

interface ResponsiveCheckerProps {
    message: string;
    onIsMobileChanged: (isMobile: boolean) => void;
}

const ResponsiveChecker: React.FC<ResponsiveCheckerProps> = ({ message, onIsMobileChanged }) => {
    const windowSize = useWindowSize();
    const [isMobile, setIsMobile] = useState<boolean>(true);

    useEffect(() => {
        const mobile = windowSize.width ? windowSize.width <= MOBILE_MAX_WIDTH : true;
        setIsMobile(mobile);
        onIsMobileChanged(mobile);
    }, [windowSize, onIsMobileChanged]);

    if (!isMobile) {
        return (
            <div className="w-full h-screen grid items-center text-2xl font-bold bg-white">
                <div>
                    <Image src={logo} alt="logo" className="w-1/3 m-auto mb-8" />
                    <p className="w-full text-center text-blue text-3xl">{message}</p>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default ResponsiveChecker;
