import React, { useEffect } from 'react';
import Image from 'next/image';
import mobile_map from '@/images/mobile_map.png';
import safe from '@/images/safe.png';
import styles from './Mobile.module.scss';
import classNames from 'classnames';
import useInView from '../Mobile/useInView';

function FourthPage() {
    const [ref, isInView] = useInView(0.5);
    return (
        <div className={classNames('flex', styles.boxContainer)} ref={ref}>
            <div className="m-auto text-center">
                <div className={classNames('w-fit', styles.fadeUp, isInView ? styles.fadeUpVisible : styles.fadeUp)}>
                    <p className={classNames(styles.blue, 'whitespace-nowrap h-fit text-2xl font-bold')}>세이프존에서</p>
                    <p className="whitespace-nowrap h-fit text-2xl font-bold mb-[2rem]">안전하게 거래하세요.</p>
                    {/* <Image src={mobile_map} alt="web_map" className="rounded-[20px] w-4/5 m-auto" /> */}
                    <Image src={safe} alt="web_map" className="w-[80%]  m-auto" />
                </div>
            </div>
        </div>
    );
}

export default FourthPage;
