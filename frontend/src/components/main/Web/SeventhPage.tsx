import React, { useEffect } from 'react';
import Image from 'next/image';
import img_step_01 from '@/images/img_step_01.jpg';
import styles from './Web.module.scss';
import classNames from 'classnames';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useInView from '../Web/useInView';

function SeventhPage() {
    const [ref, isInView] = useInView(0.5);
    useEffect(() => {
        console.log('Visibility status:', isInView ? 'Second Visible' : '');
    }, [isInView]);

    return (
        <div className={classNames('text-4xl font-bold text-center', styles.fadeUp, isInView ? styles.fadeUpVisible : styles.fadeUp)}>
            <p className={classNames(styles.margin, styles.blue, 'font-PreB')}>이웃과 함께 나누는 기쁨,</p>
            <p className="font-PreB -mt-2">동네 대여 서비스에서 찾아보세요!</p>
            <div className="carousel w-full mt-12" ref={ref}></div>
        </div>
    );
}

export default SeventhPage;
