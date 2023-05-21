import { useState, useEffect } from 'react';
import { BsStarFill } from 'react-icons/bs';

interface prop {
    data: number;
    isMobile: boolean | null;
    isDesktop: boolean | null;
}

function StarRate({ data, isMobile, isDesktop }: prop) {
    const [star, setStar] = useState<number[]>([0, 0, 0, 0, 0]);

    useEffect(() => {
        setStar(star.map((_, index) => (index < data ? 1 : 0)));
    }, [data]);

    if (isDesktop === null || isMobile === null) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {isDesktop && (
                <div className="flex items-center m-0">
                    {star.map((item, index) => {
                        return <div key={index}>{item === 1 ? <BsStarFill color={`#5669FF`} size={24} /> : <BsStarFill size={24} />}</div>;
                    })}
                </div>
            )}
            {isMobile && (
                <div className="flex items-center m-0">
                    {star.map((item, index) => {
                        return <div key={index}>{item === 1 ? <BsStarFill color={`#5669FF`} /> : <BsStarFill />}</div>;
                    })}
                </div>
            )}
        </>
    );
}

export default StarRate;
