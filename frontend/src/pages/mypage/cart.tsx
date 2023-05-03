import React, { useState, useEffect } from 'react';
import Container from '@/components/Container';
import Body from '@/components/Container/components/Body';
import Header from '@/components/Container/components/Header';
import { axBase } from '../../apis/axiosinstance';
import Card from '../../components/Card/ItemCard';
import Link from 'next/link';

function Cart() {
    interface RentalItem {
        productImg: string;
        title: string;
        location: string;
        price: number;
        startDate?: string;
        endDate?: string;
        isSafe?: boolean;
        isCart?: boolean;
    }
    const [itemList, setItemList] = useState<RentalItem[]>([]);

    useEffect(() => {
        const url = `/product-service/auth/cart`;
        axBase({ url })
            .then(res => {
                setItemList(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <Container>
            <Header title="찜 목록"></Header>
            <Body>
                <div className="border-b mt-[5rem]"></div>
                {itemList.map((item, index) => (
                    <Link key={index} href={''}>
                        <Card
                            productImg={item.productImg}
                            title={item.title}
                            location={item.location}
                            price={item.price}
                            startDate={item.startDate}
                            endDate={item.endDate}
                            isSafe={item.isSafe}
                            isCart={item.isCart}
                        />
                    </Link>
                ))}
            </Body>
        </Container>
    );
}

export default Cart;
