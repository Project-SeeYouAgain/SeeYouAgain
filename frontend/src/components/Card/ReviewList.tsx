import Review from './Review';
import { useState, useEffect } from 'react';
import { axBase } from '@/apis/axiosinstance';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user/atoms';
import write from '../../../public/icon/create-file.png';
import Image from 'next/image';

interface dataprop {
    productId: number;
    reviewListSize: number;
}

function ReviewList(propdata: dataprop) {
    interface reviewdata {
        nickname: string;
        content: string;
        reviewScore: number;
        createdAt: string;
        reviewImgUrl: string;
        reviewId: number;
    }
    const [reviewList, setReviewList] = useState<reviewdata[]>([]);
    const [page, setPage] = useState<number>(1);
    const token = useRecoilValue(userState).accessToken;

    useEffect(() => {
        let url = '';
        if (page === 1) {
            url = `/product-service/auth/review/${propdata.productId}`;
        } else {
            url = `/product-service/auth/review/${propdata.productId}/${reviewList[reviewList.length - 1].reviewId}`;
        }

        axBase(token)({ url: url })
            .then(res => {
                console.log(res.data.data);
                setReviewList(res.data.data);
            })
            .catch(err => console.log(err));
    }, [page]);

    function PageLeft() {
        if (page !== 1) {
            setPage(page - 1);
        }
    }

    function PageRight() {
        if (page !== Math.ceil(propdata.reviewListSize / 3)) {
            setPage(page + 1);
        }
    }

    return (
        <div>
            {reviewList.length !== 0 ? (
                <>
                    {reviewList.map((item, index) => (
                        <Review nickname={item.nickname} content={item.content} reviewScore={item.reviewScore} createdAt={item.createdAt} reviewImgUrl={item.reviewImgUrl} key={index} />
                    ))}
                    <div className="flex justify-center">
                        <span className={page === 1 ? 'text-white mr-[0.6rem]' : 'text-black mr-[0.6rem]'} onClick={PageLeft}>
                            &lt;
                        </span>
                        {Array.from({ length: Math.ceil(propdata.reviewListSize / 3) }).map((_, index) => (
                            <span className={page === index + 1 ? 'text-black mr-[0.6rem] underline underline-offset-4' : 'text-[#C6C6C6] mr-[0.6rem]'} key={index} onClick={() => setPage(index + 1)}>
                                {index + 1}
                            </span>
                        ))}
                        <span className={page === Math.ceil(propdata.reviewListSize / 3) ? 'text-white' : 'text-black'} onClick={PageRight}>
                            &gt;
                        </span>
                    </div>
                    <div className="h-[5rem]"></div>
                </>
            ) : (
                <div>
                    <div>
                        <Image src={write} alt="리뷰작성" className=" w-[8rem] ml-[25vw]" />
                        <p className="text-center text-darkgrey mt-[1rem]">아직 작성된 리뷰가 없어요.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ReviewList;
