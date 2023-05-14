import React, { useEffect } from 'react';
import Image from 'next/image';
import img_step_01 from '@/images/img_step_01.png';
import img_step_02 from '@/images/img_step_02.png';
import img_step_03 from '@/images/img_step_03.png';
import useInView from '../Mobile/useInView';
import classNames from 'classnames';
import styles from './Mobile.module.scss';

function FifthPage() {
    const [ref, isInView] = useInView(0.3);
    useEffect(() => {
        console.log('Visibility status:', isInView ? 'fifth Visible' : '');
    }, [isInView]);
    return (
        <div className={classNames(styles.boxContainer, 'text-center')} ref={ref}>
            <div className={classNames(styles.fadeUp, isInView ? styles.fadeUpVisible : styles.fadeUp)}>
                <div className={classNames('text-xl font-bold mt-16')}>
                    <p>
                        <span className="text-blue">필요한 물건</span>이 있다면
                    </p>
                    <p>주변 이웃에게 빌려볼까요?</p>
                </div>
                <div className="m-auto text-left pb-20 mx-8">
                    <div className={classNames(styles.fifthPage_box)}>
                        <div className="mb-4">
                            <p className="text-xl font-bold text-blue">STEP 1.</p>
                            <p className="text-2xl font-bold">물품 탐색</p>
                            <p className="text-sm mt-2">빌려주거나 빌릴 물건을</p>
                            <p className="text-sm">이웃들의 게시물로 찾아요.</p>
                        </div>
                        <Image src={img_step_01} alt="step 1" className="rounded-2xl w-full" />
                    </div>
                    <div className={classNames(styles.fifthPage_box)}>
                        <div className="mb-4">
                            <p className="text-xl font-bold text-blue">STEP 2.</p>
                            <p className="text-2xl font-bold">안전 대여</p>
                            <p className="text-sm mt-2">이웃과 약속을 잡고</p>
                            <p className="text-sm">세이프존에서 거래해요.</p>
                        </div>
                        <Image src={img_step_02} alt="step 2" className="rounded-2xl w-full" />
                    </div>
                    <div className={classNames(styles.fifthPage_box, 'mb-16')}>
                        <div className="mb-4">
                            <p className="text-xl font-bold text-blue">STEP 3.</p>
                            <p className="text-2xl font-bold">반납과 평가</p>
                            <p className="text-sm mt-2">이웃과 다시 만나</p>
                            <p className="text-sm">물건을 반납하고 리뷰를 남겨요.</p>
                        </div>
                        <Image src={img_step_03} alt="step 3" className="rounded-2xl w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FifthPage;
