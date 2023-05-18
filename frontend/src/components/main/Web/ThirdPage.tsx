import React, { useEffect } from 'react';
import Image from 'next/image';
import img_earth from '@/images/img_earth.jpg';
import styles from './Web.module.scss';
import classNames from 'classnames';
import useInView from '../Web/useInView';

function ThirdPage() {
    const [ref, isInView] = useInView(0.5);

    return (
        <div className={classNames(styles.boxContainer)} ref={ref}>
            <div className={classNames('text-center', styles.fadeUp, isInView ? styles.fadeUpVisible : styles.fadeUp)}>
                <div className="mb-5">
                    <p className={classNames(styles.text, styles.blue)}>불필요한 낭비를 줄여</p>
                    <p className={styles.text}>환경 보호에도 좋습니다.</p>
                </div>
                <div className={classNames('rounded-xl')}>
                    <Image src={img_earth} alt="img_earth" className="w-full" />
                </div>
            </div>
        </div>
    );
}

export default ThirdPage;
