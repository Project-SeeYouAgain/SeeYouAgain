import Container from '@/components/Container';
import CloseHeader from '@/components/Container/components/CloseHeader';
import React, { useState } from 'react';
import Body from '@/components/Container/components/Body';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function book() {
    const close = () => {
        console.log('dd');
    };
    const [startDate, setStartDate] = useState<Date | null>('');
    const [endDate, setEndDate] = useState<Date | null>('');

    return (
        <Container>
            <CloseHeader title="예약하기" onClose={close} />
            <Body className="mt-8 text-xl">
                <p>대여기간</p>
                <DatePicker
                    inline={true}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    onChange={update => {
                        setStartDate(update[0]);
                        setEndDate(update[1]);
                    }}
                />
            </Body>
        </Container>
    );
}

export default book;
