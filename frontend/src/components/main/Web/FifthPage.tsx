import React, { useEffect } from 'react';
import Image from 'next/image';
import img_step_01 from '@/images/img_step_01.png';
import img_step_02 from '@/images/img_step_02.png';
import img_step_03 from '@/images/img_step_03.png';
import classNames from 'classnames';
import styles from './Web.module.scss';
import useInView from '../Web/useInView';

function FifthPage() {
    const [ref, isInView] = useInView(0.5);

    return (
        <div className="text-center pt-16 ">
            <div className={classNames(styles.fadeUp, isInView ? styles.fadeUpVisible : styles.fadeUp)}>
                <div className={classNames('text-4xl font-bold')}>
                    <p>
                        <span className="text-blue">필요한 물건</span>이 있다면
                    </p>
                    <p>주변 이웃에게 빌려볼까요?</p>
                </div>
                <div className="w-1/2 m-auto text-left">
                    <div className={classNames('flex', styles.fifthPage_box)}>
                        <div>
                            <p className="text-2xl font-bold mt-4 text-blue">STEP 1.</p>
                            <p className="text-3xl font-bold mt-1">물품탐색</p>
                            <p className="text-xl mt-2">빌려주거나 빌릴 물건을</p>
                            <p className="text-xl">이웃들의 게시물로 찾아요.</p>
                        </div>
                        <Image src={img_step_01} alt="step 1" className="rounded-3xl w-2/5" />
                    </div>
                    <div className={classNames('flex', styles.fifthPage_box)} ref={ref}>
                        <div>
                            <p className="text-2xl font-bold mt-4 text-blue">STEP 2.</p>
                            <p className="text-3xl font-bold mt-1">안전대여</p>
                            <p className="text-xl mt-2">이웃과 약속을 잡고</p>
                            <p className="text-xl">세이프존에서 거래해요.</p>
                        </div>
                        <Image src={img_step_02} alt="step 2" className="rounded-3xl w-2/5" />
                    </div>
                    <div className={classNames('flex', styles.fifthPage_box)}>
                        <div>
                            <p className="text-2xl font-bold mt-4 text-blue">STEP 3.</p>
                            <p className="text-3xl font-bold mt-1">반납과 리뷰</p>
                            <p className="text-xl mt-2">이웃과 다시만나</p>
                            <p className="text-xl">물건을 반납하고 리뷰를 남겨요.</p>
                        </div>
                        <Image src={img_step_03} alt="step 3" className="rounded-3xl w-2/5" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FifthPage;
