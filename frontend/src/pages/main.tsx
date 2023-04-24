import React from 'react';
import FifthPage from '../components/main/Web/FifthPage';
import SeventhPage from '../components/main/Web/SeventhPage';
import SecondPage from '../components/main/Web/SecondPage';
import ThirdPage from '../components/main/Web/ThirdPage';
import FourthPage from '../components/main/Web/FourthPage';
import SixthPage from '../components/main/Web/SixthPage';
import FirstPage from '../components/main/Web/FirstPage';
import styles from './main.module.scss';
import classNames from 'classnames';

export default function Home() {
    return (
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
    );
}
