import React, { useEffect } from 'react';
import Image from 'next/image';
// import greeting from '@/images/greeting.png';
import handshake from '@/images/handshake.png';
import styles from './Mobile.module.scss';
import classNames from 'classnames';
import useInView from '../Mobile/useInView';

function SixthPage() {
    const [ref, isInView] = useInView(0.5);

    return (
        <div className={styles.boxContainer} ref={ref}>
            <div className={classNames('w-full px-4', styles.fadeUp, isInView ? styles.fadeUpVisible : styles.fadeUp)}>
                <div className="text-xl font-PreB">
                    <p>가지고 있는 물건으로</p>
                    <span className="flex">
                        <p className="text-blue">소정의 수입</p>을
                    </span>
                    <p>얻을 수 있고</p>
                </div>
                <Image src={handshake} alt="greeting" className="p-4 pt-8 pb-8" />
                <div className="text-xl font-bold text-right">
                    <p>잠깐 필요한 물건을</p>
                    <p>사지 않아 지출을</p>
                    <p className="text-blue">줄일 수 있고</p>
                </div>
            </div>
        </div>
    );
}

export default SixthPage;
