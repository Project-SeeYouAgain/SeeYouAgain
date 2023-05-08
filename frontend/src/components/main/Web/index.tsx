import React, { useEffect } from 'react';
import FifthPage from '../Web/FifthPage';
import SeventhPage from '../Web/SeventhPage';
import SecondPage from '../Web/SecondPage';
import ThirdPage from '../Web/ThirdPage';
import FourthPage from '../Web/FourthPage';
import SixthPage from '../Web/SixthPage';
import FirstPage from '../Web/FirstPage';
import styles from '../Web/main.module.scss';
import classNames from 'classnames';
import Image from 'next/image';
import logo from '@/images/logo.png';
import kakao from '@/assets/icons/kakao_login_medium_narrow.png';

export default function index() {
    // useEffect(() => {}, []);

    // const handleKakaoLogin = () => {};

    return (
        <div>
            <div className={classNames('fixed top-0 h-16 w-full p-4 pl-12 pr-12', styles.header)}>
                <Image src={logo} alt="logo" width={100} />
                {/* <div onClick={handleKakaoLogin} className={classNames(styles.btn, 'rounded-xl')}> */}
                <div className={classNames(styles.btn, 'rounded-xl')}>
                    <Image src={kakao} alt="kakaologin" className="p-0 m-0 rounded-xl" />
                </div>
            </div>
            <div className={styles.main_body}>
                <div className={classNames(styles.box, styles.point)}>
                    <FirstPage />
                </div>
                <div className={classNames(styles.box, styles.point)}>
                    <SecondPage />
                </div>
                <div className={classNames(styles.box, styles.none)}>
                    <ThirdPage />
                </div>
                <div className={classNames(styles.box, styles.none)}>
                    <FourthPage />
                </div>
                <div className={classNames(styles.box_nohidden, styles.none)}>
                    <FifthPage />
                </div>
                <div className={classNames(styles.box, styles.blue)}>
                    <SixthPage />
                </div>
                <div className={classNames(styles.box, styles.none)}>
                    <SeventhPage />
                </div>
            </div>
        </div>
    );
}
