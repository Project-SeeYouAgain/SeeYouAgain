import React from 'react';
import Image from 'next/image';
import web_main from '@/images/web_main.gif';
import styles from './Web.module.scss';

function FirstPage() {
    return (
        <div className={styles.parent}>
            <div className={styles.textContainer}>
                <div className={styles.first}>
                    <p>물건 대여 서비스</p>
                    <p>
                        <span className={styles.pointColor}>S</span>ee<span className={styles.pointColor}>Y</span>ou<span className={styles.pointColor}>A</span>gain
                    </p>
                </div>
            </div>
            <Image src={web_main} alt="main image" className="w-full" height={200} />
        </div>
    );
}

export default FirstPage;
