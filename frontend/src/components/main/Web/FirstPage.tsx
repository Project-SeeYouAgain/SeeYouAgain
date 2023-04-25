import React, { useEffect } from 'react';
import Image from 'next/image';
import web_main from '@/images/web_main.gif';
import styles from './Web.module.scss';
import useInView from './useInView';
import classNames from 'classnames';

function FirstPage() {
    const [ref, isInView] = useInView(0.5);

    useEffect(() => {
        console.log('Visibility status:', isInView ? 'First Visible' : '');
    }, [isInView]);

    return (
        <div className={styles.parent}>
            <div className={classNames(styles.textContainer)} ref={ref}>
                <div className={classNames(styles.first, styles.fadeUp, isInView ? styles.fadeUpVisible : styles.fadeUp)}>
                    <p>물건 대여 서비스</p>
                    <p>
                        <span className={styles.pointColor}>S</span>ee<span className={styles.pointColor}>Y</span>ou<span className={styles.pointColor}>A</span>gain
                    </p>
                </div>
            </div>
            <Image src={web_main} alt="main image" className="w-full h-screen" />
        </div>
    );
}

export default FirstPage;
