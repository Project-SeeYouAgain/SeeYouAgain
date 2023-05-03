import React, { useEffect } from 'react';
import Image from 'next/image';
import img_step_01 from '@/images/img_step_01.jpg';
import styles from './Mobile.module.scss';
import classNames from 'classnames';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useInView from '../Mobile/useInView';

function SeventhPage() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 4000,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: 'linear',
        slidesToShow: 2,
        slidesToScroll: 1,
        pauseOnHover: false,
    };
    const reverse_settings = {
        dots: false,
        infinite: true,
        rtl: true,
        speed: 4000,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: 'linear',
        slidesToShow: 2,
        slidesToScroll: 1,
        pauseOnHover: false,
    };
    const [ref, isInView] = useInView(0.5);
    useEffect(() => {
        console.log('Visibility status:', isInView ? 'Second Visible' : '');
    }, [isInView]);

    return (
        <div className={classNames('text-2xl font-bold text-center', styles.fadeUp, isInView ? styles.fadeUpVisible : styles.fadeUp)}>
            <p className={classNames(styles.margin, styles.blue)}>같이 만들어가는 좋은 세상</p>
            <p>행복해집니다.</p>
            <div className="carousel w-full mt-4" ref={ref}>
                <Slider {...settings}>
                    <div>
                        <Image src={img_step_01} alt="step 1" className="rounded-3xl p-2" />
                    </div>
                    <div>
                        <Image src={img_step_01} alt="step 1" width={400} height={300} className="rounded-3xl p-2" />
                    </div>
                    <div>
                        <Image src={img_step_01} alt="step 1" width={400} height={300} className="rounded-3xl p-2" />
                    </div>
                    <div>
                        <Image src={img_step_01} alt="step 1" width={400} height={300} className="rounded-3xl p-2" />
                    </div>
                    <div>
                        <Image src={img_step_01} alt="step 1" width={400} height={300} className="rounded-3xl p-2" />
                    </div>
                    <div>
                        <Image src={img_step_01} alt="step 1" width={400} height={300} className="rounded-3xl p-2" />
                    </div>
                </Slider>
            </div>
            <div className="carousel w-full" ref={ref}>
                <Slider {...reverse_settings}>
                    <div>
                        <Image src={img_step_01} alt="step 1" width={400} height={300} className="rounded-3xl p-2" />
                    </div>
                    <div>
                        <Image src={img_step_01} alt="step 1" width={400} height={300} className="rounded-3xl p-2" />
                    </div>
                    <div>
                        <Image src={img_step_01} alt="step 1" width={400} height={300} className="rounded-3xl p-2" />
                    </div>
                    <div>
                        <Image src={img_step_01} alt="step 1" width={400} height={300} className="rounded-3xl p-2" />
                    </div>
                    <div>
                        <Image src={img_step_01} alt="step 1" width={400} height={300} className="rounded-3xl p-2" />
                    </div>
                    <div>
                        <Image src={img_step_01} alt="step 1" width={400} height={300} className="rounded-3xl p-2" />
                    </div>
                </Slider>
            </div>
        </div>
    );
}

export default SeventhPage;
