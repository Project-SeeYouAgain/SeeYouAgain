import React, { useEffect } from 'react';
import Image from 'next/image';
import s1 from '@/images/s1.png';
import s2 from '@/images/s2.png';
import s3 from '@/images/s3.png';
import s4 from '@/images/s4.png';
import s5 from '@/images/s5.png';
import s6 from '@/images/s6.png';
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
            <p className={classNames(styles.margin, styles.blue, 'font-PreB')}>이웃과 함께 나누는 기쁨,</p>
            <p className="font-PreB -mt-2">동네 대여 서비스에서 찾아보세요!</p>
            <div className="carousel w-full mt-4" ref={ref}>
                <Slider {...settings}>
                    <div>
                        <Image src={s1} alt="step 1" className="rounded-3xl p-2" />
                    </div>
                    <div>
                        <Image src={s2} alt="step 1" width={400} height={300} className="rounded-3xl p-2" />
                    </div>
                    <div>
                        <Image src={s3} alt="step 1" width={400} height={300} className="rounded-3xl p-2" />
                    </div>
                    <div>
                        <Image src={s5} alt="step 1" width={400} height={300} className="rounded-3xl p-2" />
                    </div>
                    <div>
                        <Image src={s4} alt="step 1" width={400} height={300} className="rounded-3xl p-2" />
                    </div>
                    <div>
                        <Image src={s6} alt="step 1" width={400} height={300} className="rounded-3xl p-2" />
                    </div>
                </Slider>
            </div>
            <div className="carousel w-full" ref={ref}>
                <Slider {...reverse_settings}>
                    <div>
                        <Image src={s1} alt="step 1" width={400} height={300} className="rounded-3xl p-2" />
                    </div>
                    <div>
                        <Image src={s2} alt="step 1" width={400} height={300} className="rounded-3xl p-2" />
                    </div>
                    <div>
                        <Image src={s3} alt="step 1" width={400} height={300} className="rounded-3xl p-2" />
                    </div>
                    <div>
                        <Image src={s5} alt="step 1" width={400} height={300} className="rounded-3xl p-2" />
                    </div>
                    <div>
                        <Image src={s4} alt="step 1" width={400} height={300} className="rounded-3xl p-2" />
                    </div>
                    <div>
                        <Image src={s6} alt="step 1" width={400} height={300} className="rounded-3xl p-2" />
                    </div>
                </Slider>
            </div>
        </div>
    );
}

export default SeventhPage;
