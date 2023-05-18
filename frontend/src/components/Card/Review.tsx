import Image from 'next/image';
import StarRate from './StarRate';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { reviewState } from 'recoil/user/atoms';

interface ReviewProp {
    nickname: string;
    content: string;
    reviewScore: number;
    createdAt: string;
    reviewImgUrl: string;
    index: number;
}

function Review(data: ReviewProp) {
    const [clickReview, setClickReview] = useRecoilState(reviewState);
    console.log(clickReview);

    function reviewClick() {
        setClickReview({
            ...clickReview,
            review: data.index,
        });
    }

    const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const desktopQuery = window.matchMedia('(min-width:767px)');
        const mobileQuery = window.matchMedia('(max-width:767px)');

        const handleDesktopQuery = (event: MediaQueryListEvent) => {
            setIsDesktop(event.matches);
        };

        const handleMobileQuery = (event: MediaQueryListEvent) => {
            setIsMobile(event.matches);
        };

        desktopQuery.addEventListener('change', handleDesktopQuery);
        mobileQuery.addEventListener('change', handleMobileQuery);

        // 초기값 설정
        setIsDesktop(desktopQuery.matches);
        setIsMobile(mobileQuery.matches);

        return () => {
            desktopQuery.removeEventListener('change', handleDesktopQuery);
            mobileQuery.removeEventListener('change', handleMobileQuery);
        };
    }, []);

    // 로딩 중이거나 초기 상태일 때 출력할 내용
    if (isDesktop === null || isMobile === null) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {isDesktop && (
                <div className="text-[#959595]">
                    <>
                        <div className="flex justify-between">
                            <span className="text-xl">{data.nickname}</span>
                            <span className="text-xl">{data.createdAt.substring(0, 10)}</span>
                        </div>
                        <div className="flex justify-between">
                            <div className="h-[5rem]">
                                <div className="flex items-center mb-[0.5rem]">
                                    <StarRate data={data.reviewScore} isMobile={isMobile} isDesktop={isDesktop} />
                                    <span className="text-2xl h-[30px] ml-[0.3rem]">{data.reviewScore}</span>
                                </div>
                                <div className="h-[3rem] w-[100%] max-h-[3rem] text-xl">{data.content}</div>
                            </div>
                            {data.reviewImgUrl ? <Image src={data.reviewImgUrl} alt="리뷰이미지" className="w-[30%] aspect-square" width={500} height={500} /> : null}
                        </div>
                        <div className="bg-[#D9D9D9] w-[100%] h-[1px] mt-[0.5rem] mb-[1rem]"></div>
                    </>
                </div>
            )}
            {isMobile && (
                <div className="text-[#959595]" onClick={() => reviewClick()}>
                    {data.index !== clickReview.review ? (
                        <>
                            <div className="flex justify-between">
                                <span>{data.nickname}</span>
                                <span>{data.createdAt.substring(0, 10)}</span>
                            </div>
                            <div className="flex justify-between">
                                <div className="h-[5rem]">
                                    <div className="flex items-center mb-[0.5rem]">
                                        <StarRate data={data.reviewScore} isMobile={isMobile} isDesktop={isDesktop} />
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
                                        <StarRate data={data.reviewScore} isMobile={isMobile} isDesktop={isDesktop} />
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
            )}
        </>
    );
}

export default Review;
