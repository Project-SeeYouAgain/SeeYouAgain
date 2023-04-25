import React, { useEffect } from 'react';
import Image from 'next/image';
import greeting from '@/images/greeting.png';
import styles from './Web.module.scss';
import classNames from 'classnames';
import useInView from './useInView';

function SixthPage() {
    const [ref, isInView] = useInView();
    useEffect(() => {
        console.log('Visibility status:', isInView ? 'Second Visible' : '');
    }, [isInView]);
    return (
        <div className={styles.parent}>
            <div className={styles.textContainer} ref={ref}>
                <div className={classNames(styles.spacebetween, 'w-full', styles.fadeUp, isInView ? styles.fadeUpVisible : styles.fadeUp)}>
                    <div className="text-2xl text-white font-bold">
                        <p>가지고 있는 물건으로</p>
                        <p>짭짤한 수입을</p>
                        <p>만들 수 있고</p>
                    </div>
                    <div className="text-2xl text-white font-bold text-right">
                        <p>잠깐 필요한 물건을</p>
                        <p>사지 않아 지출을</p>
                        <p>줄일 수 있고</p>
                    </div>
                </div>
                <Image src={greeting} alt="greeting" width={600} height={200} className={classNames('ml-8 mr-8', styles.fadeUp, isInView ? styles.fadeUpVisible : styles.fadeUp)} />
            </div>
        </div>
    );
}

export default SixthPage;
