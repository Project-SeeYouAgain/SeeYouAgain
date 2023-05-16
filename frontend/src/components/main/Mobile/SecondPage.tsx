import React, { useEffect } from 'react';
import Image from 'next/image';
import shop from '@/images/shop.png';
import styles from './Mobile.module.scss';
import classNames from 'classnames';
import useInView from '../Mobile/useInView';

function SecondPage() {
    const [ref, isInView] = useInView(0.5);
    useEffect(() => {
        console.log('Visibility status:', isInView ? 'Second Visible' : '');
    }, [isInView]);
    return (
        <div className={classNames(styles.boxContainer)} ref={ref}>
            <div className={classNames(styles.fadeUp, isInView ? styles.fadeUpVisible : styles.fadeUp)}>
                <Image src={shop} alt="shop" className="m-auto w-4/5" />
                <div className={classNames(styles.textBox)}>
                    <p className="text-s font-NanumNeo font-bold mb-1">Borrow what you need</p>
                    <p className="text-2xl font-bold">한번 쓰려고 </p>
                    <p className="text-2xl font-bold">사기에는 아까운 물건</p>
                    <p className="text-2xl font-bold">이웃에게 빌려보세요</p>
                </div>
            </div>
        </div>
    );
}

export default SecondPage;
