import React, { useEffect } from 'react';
import Image from 'next/image';
import img_earth from '@/images/img_earth_mobile.jpg';
import styles from './Mobile.module.scss';
import classNames from 'classnames';
import useInView from '../Mobile/useInView';

function ThirdPage() {
    const [ref, isInView] = useInView(0.5);

    return (
        <div className={classNames(styles.boxContainer)} ref={ref}>
            <div className={classNames('text-center', styles.textBox, styles.fadeUp, isInView ? styles.fadeUpVisible : styles.fadeUp)}>
                <p className={classNames(styles.text, styles.blue)}>불필요한 낭비를 줄여</p>
                <p className={styles.text}>환경 보호에 좋습니다.</p>
                <Image src={img_earth} alt="img_earth" className="w-full" />
            </div>
        </div>
    );
}

export default ThirdPage;
