import React, { useEffect } from 'react';
import Image from 'next/image';
import shop from '@/images/shop.png';
import styles from './Web.module.scss';
import classNames from 'classnames';
import useInView from '../Web/useInView';

function SecondPage() {
    const [ref, isInView] = useInView(0.5);

    return (
        <div className={classNames(styles.boxContainer)} ref={ref}>
            <div className={classNames(styles.fadeUp, isInView ? styles.fadeUpVisible : styles.fadeUp, 'flex items-center')}>
                <Image src={shop} alt="online" width={300} height={400} className="mr-8" />
                <div className={classNames('whitespace-nowrap align-middle')}>
                    <p className="text-xl">Borrow what you need</p>
                    <p className="text-3xl font-bold">한번 쓰려고 사기엔 아까운 것들</p>
                    <p className="text-3xl font-bold">이웃에게 빌려보세요</p>
                    <div className="mt-3">
                        <p>망치가 필요한데 사기엔 너무 아까우시다구요?</p>
                        <p>닌텐도를 한번 써보고 사고 싶은데 주변에 체험관이 없으시다구요?</p>
                        <p>주변에 망치있는 친구가, 닌텐도가 있는 친구가 있으면 참 좋을텐데....</p>
                        <p>그 친구 찾을수 있도록 저희가 도와드리겠습니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SecondPage;
