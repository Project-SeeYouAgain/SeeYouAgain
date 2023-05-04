import React, { FunctionComponent, HTMLProps, useState, useEffect } from 'react';
import Image from 'next/image';

interface CarouselProps {
    imgUrl: string[];
}

const Carousel: FunctionComponent<CarouselProps> = ({ imgUrl }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <div id="default-carousel" className="relative w-full" data-carousel="static">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                {imgUrl.map((item: string, index: number) => (
                    <div className={'duration-700 ease-in-out'} data-carousel-item="active" key={index}>
                        <Image src={item} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" width={300} height={400} alt="제품이미지" />
                    </div>
                ))}
            </div>
            <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
            </div>
        </div>
    );
};

export default Carousel;
