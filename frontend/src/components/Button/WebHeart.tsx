import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from 'recoil/user/atoms';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { axAuth } from '@/apis/axiosinstance';

interface ButtonProps {
    isActive: boolean;
    className: string;
    productId: number;
}

function Heart({ isActive, className, productId }: ButtonProps) {
    const [isCart, setIsCart] = useState<boolean>(false);
    useEffect(() => {
        setIsCart(isActive);
    }, [isCart]);

    const token = useRecoilValue(userState).accessToken;

    function ClickHeart(event: React.MouseEvent) {
        event.stopPropagation();
        const url = `/product-service/auth/cart/${productId}`;
        if (isCart) {
            axAuth(token)({ method: 'delete', url: url })
                .then(() => setIsCart(!isCart))
        } else {
            axAuth(token)({ method: 'post', url: url })
                .then(() => setIsCart(!isCart))
        }
    }
    return (
        <>
            {isCart ? (
                <AiFillHeart className={` w-8 h-8 ${className}`} color={'#5669FF'} onClick={(event: React.MouseEvent) => ClickHeart(event)} />
            ) : (
                <AiOutlineHeart className={`w-8 h-8 ${className}`} color={'#5669FF'} onClick={(event: React.MouseEvent) => ClickHeart(event)} />
            )}
        </>
    );
}

export default Heart;
