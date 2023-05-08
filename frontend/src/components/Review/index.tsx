import { axAuth } from '@/apis/axiosinstance';
import React, { useEffect, useState } from 'react';

function index(productId: number) {
    const [lastReviewId, setLastReviewId] = useState<number>();
    const [reviews, setReviews] = useState<[]>([]);
    useEffect(() => {
        axAuth({
            url: `/product-service/auth/review/${productId}/${lastReviewId}`,
        })
            .then(res => {
                setReviews(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [lastReviewId]);

    return <div>{reviews}</div>;
}
export default index;
