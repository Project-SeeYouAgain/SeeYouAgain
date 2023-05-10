import Review from './Review';
import { useState, useEffect } from 'react';
import { axBase } from '@/apis/axiosinstance';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user/atoms';

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
    }
    const [reviewList, setReviewList] = useState<reviewdata[]>([]);
    const [page, setPage] = useState<number>(1);
    const token = useRecoilValue(userState).accessToken;

    useEffect(() => {
        const url = `/product-service/auth/review/${propdata.productId}`;
        axBase(token)({ url: url })
            .then(res => {
                console.log(res.data.data);
                setReviewList(res.data.data);
            })
            .catch(err => console.log(err));
    });

    return (
        <div>
            {reviewList.length !== 0 ? (
                reviewList.map((item, index) => (
                    <Review nickname={item.nickname} content={item.content} reviewScore={item.reviewScore} createdAt={item.createdAt} reviewImgUrl={item.reviewImgUrl} key={index} />
                ))
            ) : (
                <div>리뷰가 없습니다.</div>
            )}
        </div>
    );
}

export default ReviewList;
