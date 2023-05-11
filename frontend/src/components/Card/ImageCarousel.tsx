import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Carousel.module.css';
import Image from 'next/image';

interface CarouselProps {
    imgUrl: string[];
}

function Carousel({ imgUrl }: CarouselProps) {
    const sliderRef = useRef<Slider>(null);

    const settings = {
        // 도트 썸네일
        // customPaging: function (i: number) {
        //     return (
        //         <a>
        //             <img src={imgUrl[i]} />
        //         </a>
        //     );
        // },
        dots: true,
        infinite: true,
        variableWidth: true,
        swipeToSlide: true,
        dotsClass: 'slick-dots',
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false, // 화살표 제거
    };
    // 슬라이드 동작시 스크롤 막기
    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        if (sliderRef.current && sliderRef.current.innerSlider) {
            event.preventDefault();
            event.stopPropagation();
            const track = sliderRef.current.innerSlider.list;
            if (track) {
                track.scrollTop += event.deltaY;
            }
        }
    };
    return (
        <div className="relative w-[100vw] h-[45vh] mb-[1rem]" onWheel={handleWheel}>
            <Slider {...settings} className={`absolute w-[100vw] ${styles.sliderContainer}`}>
                {imgUrl.map((item, index) => (
                    <div key={index} className="relative w-[100vw]">
                        <img key={index} alt="제품사진" className="w-[100vw] h-[45vh] object-cover " src={item} />
                        <div className={`${styles.imageGradient} w-[100vw] aspect-square`}></div>
                        <div className={`${styles.imageGradientbottom} w-[100vw] aspect-square`}></div>
                    </div>
                ))}
            </Slider>
            {/* <div className={`${styles.backgroundBlack} w-[100vw]`}></div> */}
        </div>
    );
}

export default Carousel;
