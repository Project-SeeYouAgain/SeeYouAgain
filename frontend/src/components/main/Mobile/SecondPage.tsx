import React, { useEffect } from 'react';
import Image from 'next/image';
import hammer from '@/images/hammer.png';
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
                <Image src={hammer} alt="hammer" width={300} height={200} className="m-auto" />
                <div className={classNames(styles.textBox)}>
                    <p className="text-xl text-center font-bold">Borrow what you need</p>
                    <p className="text-3xl font-bold">한번 쓰려고 </p>
                    <p className="text-3xl font-bold">사기에는 아까운 물건</p>
                    <p className="text-3xl font-bold">이웃에게 빌려보세요</p>
                </div>
            </div>
        </div>
    );
}

export default SecondPage;
