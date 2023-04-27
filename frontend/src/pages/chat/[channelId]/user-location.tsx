import React, { useState } from 'react';
import ResponsiveChecker from '@/components/ResponsiveChecker';

const UserLocation: React.FC = () => {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    const handleIsMobileChanged = (mobile: boolean) => {
        setIsMobile(mobile);
    };
    const message = '이 사이트는 모바일 기기에서 최적화되어 있습니다. 모바일로 접속해주세요.';

    return (
        <div className="w-full h-screen">
            <ResponsiveChecker message={message} onIsMobileChanged={handleIsMobileChanged} />
            {isMobile && (
                <>
                    {/* 나머지 페이지 내용 */}
                    <p>asdfasdf</p>
                </>
            )}
        </div>
    );
};

export default UserLocation;
