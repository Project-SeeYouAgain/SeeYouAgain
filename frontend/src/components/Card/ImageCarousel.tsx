import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Carousel.module.css';
import Image from 'next/image';

interface CarouselProps {
    imgUrl: string[];
}

function Carousel({ imgUrl }: CarouselProps) {
    const settings = {
        customPaging: function (i: number) {
            return (
                <a>
                    <img src={imgUrl[i]} />
                </a>
            );
        },
        dots: true,
        infinite: true,
        variableWidth: true,
        swipeToSlide: true,
        dotsClass: 'slick-dots slick-thumb',
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className="relative">
            <Slider {...settings} className={`absolute ${styles.sliderContainer}`}>
                {imgUrl.map((item, index) => (
                    <div key={index} className="relative">
                        {/* <img src={item} alt="제품 사진" className="aspect-square w-[100vw]" /> */}
                        <img src={item} alt="제품 사진" className={`aspect-square w-[100vw]`} width={300} height={400} />
                        <div className={`${styles.imageGradient} w-[100vw] aspect-square`}></div>
                    </div>
                ))}
            </Slider>
            <div className={styles.backgroundBlack}></div>
        </div>
    );
}

export default Carousel;
