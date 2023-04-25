import React from 'react';
import Image from 'next/image';
import greeting from '@/images/greeting.png';
import styles from './Web.module.scss';
import classNames from 'classnames';

function SixthPage(props: any) {
    return (
        <div className={styles.parent}>
            <div className={styles.textContainer}>
                <div className={classNames(styles.spacebetween, 'w-full')}>
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
                <Image src={greeting} alt="greeting" width={600} height={200} className="ml-8 mr-8" />
            </div>
        </div>
    );
}

export default SixthPage;
