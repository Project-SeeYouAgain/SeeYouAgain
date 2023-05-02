import React, { useState, useEffect } from 'react';
import Container from '@/components/Container';
import Body from '@/components/Container/components/Body';
import Header from '@/components/Container/components/Header';
import Menu from '@/components/Card/Menu';
import { axBase } from '../../apis/axiosinstance';
import Card from '../../components/Card/ItemCard';
import Link from 'next/link';

function Rent() {
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
    const [menuState, setMenuState] = useState<number>(1);
    const [itemList, setItemList] = useState<RentalItem[]>([]);

    function SelectMenu(data: number) {
        setMenuState(data);
    }

    useEffect(() => {
        const url = `/product-service/auth/myproduct/${menuState}`;
        axBase({ url })
            .then(res => {
                setItemList(res.data);
            })
            .catch(err => console.log(err));
    }, [menuState]);

    return (
        <Container>
            <Header title="내 아이템"></Header>
            <Body>
                <Menu onSelectMenu={SelectMenu} />
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

export default Rent;
