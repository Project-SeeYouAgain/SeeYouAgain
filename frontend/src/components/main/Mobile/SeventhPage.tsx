import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import s1 from '@/images/s1.png';
import s2 from '@/images/s2.png';
import s3 from '@/images/s3.png';
import s4 from '@/images/s4.png';
import s5 from '@/images/s5.png';
import s6 from '@/images/s6.png';
import styles from './Mobile.module.scss';
import classNames from 'classnames';

import useInView from '../Mobile/useInView';

function SeventhPage() {
    const slideArr = [
        { id: 1, img: s1 },
        { id: 2, img: s2 },
        { id: 3, img: s3 },
        { id: 4, img: s4 },
        { id: 5, img: s5 },
        { id: 6, img: s6 },
    ];

    // const [ref, isInView] = useInView(0.5);
    // useEffect(() => {
    //     console.log('Visibility status:', isInView ? 'Second Visible' : '');
    // }, [isInView]);

    useEffect(() => {
        let bannerLeft = 0;
        let first = 1;
        let last: any;
        let imgCnt = 0;
        let $first;
        let $last;
        const $plates = document.querySelectorAll<HTMLElement>('.leftMovingPlate');
        $plates.forEach((plate: HTMLElement) => {
            plate.style.cssText = `left: ${bannerLeft}px`;
            bannerLeft += 400 + 40;
            plate.setAttribute('id', `firstPlate${++imgCnt}`);
        });
        if (imgCnt > 5) {
            last = imgCnt;
            const intervalId = setInterval(() => {
                $plates.forEach(plate => {
                    plate.style.left = `${plate.offsetLeft - 1}px`;
                });
                $first = document.querySelector<HTMLElement>(`#firstPlate${first}`);
                $last = document.querySelector<HTMLElement>(`#firstPlate${last}`);
                if ($first && $last && $first.offsetLeft < -440) {
                    $first.style.left = `${$last.offsetLeft + 440}px`;
                    first++;
                    last++;
                    if (last > imgCnt) {
                        last = 1;
                    }
                    if (first > imgCnt) {
                        first = 1;
                    }
                }
            }, 8);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, []);

    return (
        // , styles.fadeUp, isInView ? styles.fadeUpVisible : styles.fadeUp
        <div className={classNames('text-2xl font-bold text-center')}>
            <p className={classNames(styles.margin, styles.blue, 'font-PreB')}>이웃과 함께 나누는 기쁨,</p>
            <p className="font-PreB -mt-2">동네 대여 서비스에서 찾아보세요!</p>

            <div className=" w-full mt-8">
                {slideArr.map((item, index) => (
                    <div key={index} className="relative leftMovingPlate ">
                        <Image src={item.img} alt="banner" className="rounded-3xl p-2 top-0 absolute" width={400} height={300} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SeventhPage;
