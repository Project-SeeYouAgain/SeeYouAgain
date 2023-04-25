import React, { useEffect } from 'react';
import Image from 'next/image';
import img_step_01 from '@/images/img_step_01.jpg';
import styles from './Web.module.scss';
import classNames from 'classnames';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useInView from './useInView';

function SeventhPage() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 4000,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: 'linear',
        slidesToShow: 3,
        slidesToScroll: 1,
        pauseOnHover: false,
    };
    const [ref, isInView] = useInView();
    useEffect(() => {
        console.log('Visibility status:', isInView ? 'Second Visible' : '');
    }, [isInView]);

    return (
        <div className={classNames('text-4xl font-bold text-center', styles.fadeUp, isInView ? styles.fadeUpVisible : styles.fadeUp)}>
            <p className={classNames(styles.margin, styles.blue)}>같이 만들어가는 좋은 세상</p>
            <p>행복해집니다.</p>
            <div className="carousel w-full mt-12" ref={ref}>
                <Slider {...settings}>
                    <div>
                        <Image src={img_step_01} alt="step 1" width={400} height={300} className="rounded-3xl" />
                    </div>
                    <div>
                        <Image src={img_step_01} alt="step 1" width={400} height={300} className="rounded-3xl" />
                    </div>
                    <div>
                        <Image src={img_step_01} alt="step 1" width={400} height={300} className="rounded-3xl" />
                    </div>
                    <div>
                        <Image src={img_step_01} alt="step 1" width={400} height={300} className="rounded-3xl" />
                    </div>
                    <div>
                        <Image src={img_step_01} alt="step 1" width={400} height={300} className="rounded-3xl" />
                    </div>
                </Slider>
            </div>
        </div>
    );
}

export default SeventhPage;
