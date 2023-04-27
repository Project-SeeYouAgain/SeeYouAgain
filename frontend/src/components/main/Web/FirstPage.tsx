import { useState, useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { SlArrowDown } from 'react-icons/sl';
import useInView from '../Web/useInView';
import web_main from '@/images/web_main.gif';
import styles from './Web.module.scss';

function FirstPage() {
    const [scrollPos, setScrollPos] = useState(0);
    const [ref, isInView] = useInView(0.5);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setScrollPos(window.scrollY);
        }
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.code === 'PageDown' && typeof window !== 'undefined') {
            setScrollPos(window.scrollY);
        }
    };

    return (
        <div className={styles.parent} onKeyDown={handleKeyDown} tabIndex={0}>
            <div className={classNames(styles.textContainer)} ref={ref}>
                <div className={classNames(styles.first, styles.fadeUp, isInView ? styles.fadeUpVisible : styles.fadeUp)}>
                    <p>물건 대여 서비스</p>
                    <p>
                        <span className={styles.pointColor}>S</span>ee<span className={styles.pointColor}>Y</span>ou<span className={styles.pointColor}>A</span>gain
                    </p>
                </div>
            </div>
            <div className={classNames(styles.arrowContainer, 'text-white font-bold w-full text-xl', { visible: typeof window !== 'undefined' && scrollPos !== window.scrollY })}>
                <div>
                    <p>Scroll Down</p>
                    <SlArrowDown className="m-auto" />
                </div>
            </div>
            <Image src={web_main} alt="main image" className="w-full h-screen" />
        </div>
    );
}

export default FirstPage;
