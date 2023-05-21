import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Calender.module.css';
import { subDays } from 'date-fns';

interface ReservationPeriod {
    startDate: string;
    endDate: string;
}

interface AvailablePeriod {
    startDate: string;
    endDate: string;
}

interface CustomDatePickerProps {
    reservationPeriods: ReservationPeriod[];
    availablePeriod: AvailablePeriod;
    startDate?: string;
    endDate?: string;
}

function CustomDatePicker({ reservationPeriods, availablePeriod, startDate, endDate }: CustomDatePickerProps) {
    const [selectDate, setSelectDate] = useState<Date | null>(null);

    const minday = () => {
        return new Date(availablePeriod.startDate) <= new Date() ? new Date() : new Date(availablePeriod.startDate);
    };

    const maxday = () => {
        return new Date(availablePeriod.endDate);
    };

    const reservationDays = reservationPeriods.flatMap(period => {
        const start = new Date(period.startDate);
        const end = new Date(period.endDate);
        const days = [];

        for (let day = start; day <= end; day.setDate(day.getDate() + 1)) {
            days.push(new Date(day));
        }

        return days;
    });

    const isMyReservationDay = (date: Date) => {
        if (startDate && endDate) {
            const start = subDays(new Date(startDate), 1);
            const end = new Date(endDate);
            if (start <= date && end >= date) {
                return true;
            } else {
                false;
            }
        } else {
            false;
        }
    };

    return (
        <DatePicker
            onChange={date => setSelectDate(date)}
            minDate={new Date(minday())}
            maxDate={new Date(maxday())}
            selected={selectDate}
            readOnly
            disabled
            inline
            excludeDates={reservationDays}
            dayClassName={date => (isMyReservationDay(date) ? styles.myReservationDay : date.getDate() === selectDate?.getDate() ? styles.nochange : null)}
        />
    );
}

export default CustomDatePicker;
