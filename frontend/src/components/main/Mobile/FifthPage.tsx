import React, { useEffect } from 'react';
import Image from 'next/image';
import img_step_01 from '@/images/img_step_01.jpg';
import img_step_02 from '@/images/img_step_02.jpg';
import img_step_03 from '@/images/img_step_03.jpg';
import useInView from '../Mobile/useInView';
import classNames from 'classnames';
import styles from './Mobile.module.scss';

function FifthPage() {
    const [ref, isInView] = useInView(0.3);
    useEffect(() => {
        console.log('Visibility status:', isInView ? 'fifth Visible' : '');
    }, [isInView]);
    return (
        <div className={classNames(styles.boxContainer, 'text-center pt-16')} ref={ref}>
            <div className={classNames(styles.fadeUp, isInView ? styles.fadeUpVisible : styles.fadeUp)}>
                <div className={classNames('text-2xl font-bold')}>
                    <p>
                        <span className={styles.pointColor}>필요한 물건</span>이 있다면
                    </p>
                    <p>주변 이웃에게 빌려볼까요?</p>
                </div>
                <div className="m-auto text-left pb-20">
                    <div className={classNames(styles.fifthPage_box)}>
                        <div className="mb-4">
                            <p className="text-xl font-bold text-blue-700">STEP 1.</p>
                            <p className="text-2xl font-bold">회원가입</p>
                            <p className="text-sm mt-2">서비스를 이용하기 위해서는</p>
                            <p className="text-sm">회원가입이 필요합니다.</p>
                        </div>
                        <Image src={img_step_01} alt="step 1" className="rounded-3xl w-full" />
                    </div>
                    <div className={classNames(styles.fifthPage_box)}>
                        <div className="mb-4">
                            <p className="text-xl font-bold mt-4 text-blue-700">STEP 2.</p>
                            <p className="text-2xl font-bold">주변 물품 검색</p>
                            <p className="text-sm mt-2">필요한 물건을 올린 이웃이</p>
                            <p className="text-sm">주변에 있는지 확인해보세요,</p>
                        </div>
                        <Image src={img_step_02} alt="step 2" className="rounded-3xl w-full" />
                    </div>
                    <div className={classNames(styles.fifthPage_box)}>
                        <div className="mb-4">
                            <p className="text-xl font-boldtext-blue-700">STEP 3.</p>
                            <p className="text-2xl font-bold">협상과 대여</p>
                            <p className="text-sm mt-2">이웃과 시간, 장소를 정해서</p>
                            <p className="text-sm">물건을 대여해보세요.</p>
                        </div>
                        <Image src={img_step_03} alt="step 3" className="rounded-3xl w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FifthPage;
