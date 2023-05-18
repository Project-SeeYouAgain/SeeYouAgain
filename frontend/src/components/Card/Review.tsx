import Image from 'next/image';
import StarRate from './StarRate';
import { useState } from 'react';

interface ReviewProp {
    nickname: string;
    content: string;
    reviewScore: number;
    createdAt: string;
    reviewImgUrl: string;
}

function Review(data: ReviewProp) {
    const [isClick, setIsClick] = useState<boolean>(false);
    function reviewClick() {
        setIsClick(!isClick);
        console.log('변환');
    }
    return (
        <div className="text-[#959595]" onClick={() => reviewClick()}>
            {isClick === false ? (
                <>
                    <div className="flex justify-between">
                        <span>{data.nickname}</span>
                        <span>{data.createdAt.substring(0, 10)}</span>
                    </div>
                    <div className="flex justify-between">
                        <div className="h-[5rem]">
                            <div className="flex items-center mb-[0.5rem]">
                                <StarRate data={data.reviewScore} />
                                <span className="h-[20px] ml-[0.3rem]">{data.reviewScore}</span>
                            </div>
                            <div className="h-[3rem] w-[100%] overflow-ellipsis overflow-hidden max-h-[3rem] line-clamp-2">{data.content}</div>
                        </div>
                        {data.reviewImgUrl ? <Image src={data.reviewImgUrl} alt="리뷰이미지" className="w-[20%] aspect-square" width={300} height={400} /> : null}
                    </div>
                    <div className="bg-[#D9D9D9] w-[100%] h-[1px] mt-[0.5rem] mb-[1rem]"></div>
                </>
            ) : (
                <>
                    <div className="flex justify-between">
                        <span>{data.nickname}</span>
                        <span>{data.createdAt.substring(0, 10)}</span>
                    </div>
                    <div className="">
                        <div className="min-h-[5rem]">
                            <div className="flex items-center mb-[0.5rem]">
                                <StarRate data={data.reviewScore} />
                                <span className="h-[20px] ml-[0.3rem]">{data.reviewScore}</span>
                            </div>
                            <div className="w-[100%]">{data.content}</div>
                        </div>
                        {data.reviewImgUrl ? <Image src={data.reviewImgUrl} alt="리뷰이미지" className="aspect-square" width={300} height={400} /> : null}
                    </div>
                    <div className="bg-[#D9D9D9] w-[100%] h-[1px] mt-[0.5rem] mb-[1rem]"></div>
                </>
            )}
        </div>
    );
}

export default Review;
