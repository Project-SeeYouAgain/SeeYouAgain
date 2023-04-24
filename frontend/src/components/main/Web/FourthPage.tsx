import React from 'react';
import Image from 'next/image';
import web_map from '@/images/web_map.png';
import styles from './Web.module.scss';
import classNames from 'classnames';

function FourthPage(props: any) {
    return (
        <div className={styles.parent}>
            <div className={classNames('flex', styles.boxContainer)}>
                <Image src={web_map} alt="web_map" width={500} height={400} className="mr-4 rounded-xl" />
                <div className="mt-60">
                    <p className="whitespace-nowrap h-fit text-2xl font-bold text-blue-700">세이프존에서</p>
                    <p className="whitespace-nowrap h-fit text-2xl font-bold">안전하게 거래하세요.</p>
                    <p className="whitespace-nowrap h-fit text-xl">경찰서, CCTV 위치를 기반으로 추천해 드려요.</p>
                </div>
            </div>
        </div>
    );
}

export default FourthPage;
