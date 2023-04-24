import React from 'react';
import Image from 'next/image';
import img_step_01 from '@/images/img_step_01.jpg';
import img_step_02 from '@/images/img_step_02.jpg';
import img_step_03 from '@/images/img_step_03.jpg';
import classNames from 'classnames';
import styles from './Web.module.scss';

function FifthPage() {
    return (
        <div className="text-center pt-16">
            <div className="text-4xl font-bold">
                <p>
                    <span className={styles.pointColor}>필요한 물건</span>이 있다면
                </p>
                <p>주변 이웃에게 빌려볼까요?</p>
            </div>
            <div className="w-1/2 m-auto text-left">
                <div className={classNames('flex', styles.fifthPage_box)}>
                    <div>
                        <p className="text-2xl font-bold mt-4 text-blue-700">STEP 1.</p>
                        <p className="text-3xl font-bold mt-1">회원가입</p>
                        <p className="text-xl mt-2">저희 서비스를 이용하기 위해선</p>
                        <p className="text-xl">회원가입이 필요합니다.</p>
                    </div>
                    <Image src={img_step_01} alt="step 1" width={300} height={200} className="rounded-3xl" />
                </div>
                <div className={classNames('flex', styles.fifthPage_box)}>
                    <div>
                        <p className="text-2xl font-bold mt-4 text-blue-700">STEP 2.</p>
                        <p className="text-3xl font-bold mt-1">주변 물품 검색</p>
                        <p className="text-xl mt-2">내가 필요한 물품을 가지고 있는</p>
                        <p className="text-xl">이웃이 주변에 있는지 확인해보세요,</p>
                    </div>
                    <Image src={img_step_02} alt="step 2" width={300} height={200} className="rounded-3xl" />
                </div>
                <div className={classNames('flex', styles.fifthPage_box)}>
                    <div>
                        <p className="text-2xl font-bold mt-4 text-blue-700">STEP 3.</p>
                        <p className="text-3xl font-bold mt-1">협상과 대여</p>
                        <p className="text-xl mt-2">이웃과 시간, 장소를 정해서</p>
                        <p className="text-xl">물건을 대여해보세요.</p>
                    </div>
                    <Image src={img_step_03} alt="step 3" width={300} height={200} className="rounded-3xl" />
                </div>
            </div>
        </div>
    );
}

export default FifthPage;
