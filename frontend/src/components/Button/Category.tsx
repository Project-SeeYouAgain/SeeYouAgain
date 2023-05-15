import React from 'react';
import cate1 from '../../../public/icon/home.png';
import cate2 from '../../../public/icon/digital.png';
import cate3 from '../../../public/icon/wash.png';
import cate4 from '../../../public/icon/baby.png';
import cate5 from '../../../public/icon/sofa.png';
import cate6 from '../../../public/icon/fairytale.png';
import cate7 from '../../../public/icon/manstyle.png';
import cate8 from '../../../public/icon/womanclothes.png';
import cate9 from '../../../public/icon/bag.png';
import cate10 from '../../../public/icon/game.png';
import cate11 from '../../../public/icon/sports.png';
import cate12 from '../../../public/icon/book.png';
import cate13 from '../../../public/icon/pets.png';
import cate14 from '../../../public/icon/others.png';
import cate15 from '../../../public/icon/all.png';
import Image from 'next/image';

interface CategoryButtonProps {
    innerValue: string;
    onClick?: () => void;
    catekey: number;
}

function Category({ onClick, innerValue, catekey }: CategoryButtonProps) {
    // 이미지 경로를 객체로 구성
    const categoryImages: Record<number, any> = {
        1: cate1,
        2: cate2,
        3: cate3,
        4: cate4,
        5: cate5,
        6: cate6,
        7: cate7,
        8: cate8,
        9: cate9,
        10: cate10,
        11: cate11,
        12: cate12,
        13: cate13,
        14: cate14,
        15: cate15,
    };
    return (
        <div className="mb-5" onClick={onClick}>
            <div className="flex flex-col items-center text-center">
                {/* 원형 */}
                <div className="w-[4rem] h-[4rem] rounded-full bg-lightgrey flex items-center justify-center">
                    <Image src={categoryImages[catekey]} className=" w-8 h-8 opacity-60" alt="icons" />
                </div>
                {/* 타이틀 */}
                <p className="mt-2 text-[.8rem]">{innerValue}</p>
            </div>
        </div>
    );
}

export default Category;
