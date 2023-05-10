import { axAuth } from '@/apis/axiosinstance';
import React, { useEffect, useState } from 'react';
import axios, { AxiosInstance } from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from 'recoil/user/atoms';

function index(productId: number) {
    const [lastReviewId, setLastReviewId] = useState<number>();
    const [reviews, setReviews] = useState<[]>([]);
    const token = useRecoilValue(userState).accessToken;

    useEffect(() => {
        axAuth(token)({
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
