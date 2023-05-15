import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import web_main from '@/images/mobile.png';
import textlogo from '@/images/sya.png';
import styles from './Mobile.module.scss';
import useInView from '../Mobile/useInView';
import classNames from 'classnames';
import { SlArrowDown } from 'react-icons/sl';

function FirstPage() {
    const [scrollPos, setScrollPos] = useState(0);
    const [ref, isInView] = useInView(0.5);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setScrollPos(window.scrollY);
        }
    }, []);

    return (
        <div className={styles.parent}>
            <div className={classNames(styles.textContainer)} ref={ref}>
                <div className={classNames(styles.first, styles.fadeUp, isInView ? styles.fadeUpVisible : styles.fadeUp, '-mt-[35vh]')}>
                    <p className={classNames(styles.title, 'font-NanumNeo font-bold text-[2rem] ')}>SEE YOU AGAIN</p>
                    <p className={classNames(styles.title, 'font-NanumNeoLt text-[1.1em] ')}>안전한 우리 동네 대여서비스</p>
                    {/* <p className={classNames(styles.title, 'font-NanumNeo text-[1.4rem]')}>동네 대여 서비스에서 찾아보세요!</p> */}
                    <p className={classNames(styles.logo, 'tracking-wider')}>
                        {/* <span className={styles.pointColor}>S</span>ee<span className={styles.pointColor}>Y</span>ou<span className={styles.pointColor}>A</span>gain */}
                    </p>
                </div>
            </div>
            <div className={classNames(styles.arrowContainer, 'text-white font-NanumNeo font-bold w-full text-xl', { visible: typeof window !== 'undefined' && scrollPos !== window.scrollY })}>
                <div>
                    <p>Scroll Down</p>
                    <SlArrowDown className="m-auto" />
                </div>
            </div>
            <div className="h-[100vh]">
                <Image src={web_main} alt="main image" className="w-full h-full object-cover" />
            </div>
        </div>
    );
}

export default FirstPage;
