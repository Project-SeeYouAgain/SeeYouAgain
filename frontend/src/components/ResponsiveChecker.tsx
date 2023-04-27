// components/ResponsiveChecker.tsx
import { useWindowSize } from './hooks/useWindowSize';
import { useEffect, useState } from 'react';

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
            <div className="w-full h-screen flex items-center text-2xl font-bold bg-white">
                <p className="w-full text-center text-blue text-3xl">{message}</p>
            </div>
        );
    } else {
        return null;
    }
};

export default ResponsiveChecker;
