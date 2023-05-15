import React, { useState } from 'react';
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
}

function CustomDatePicker({ reservationPeriods, availablePeriod }: CustomDatePickerProps) {
    const [selectDate, setSelectDate] = useState<Date | null>(null);

    const minday = () => {
        return new Date(availablePeriod.startDate) <= new Date() ? new Date() : new Date(availablePeriod.startDate);
    };

    const maxday = () => {
        return new Date(availablePeriod.endDate);
    };

    const reservationdays = reservationPeriods.map(period => ({
        start: new Date(period.startDate),
        end: new Date(period.endDate),
    }));

    const isReservationDay = (date: Date) => {
        return reservationdays.some(period => date >= subDays(new Date(period.start), 1) && date <= period.end);
    };

    return (
        <DatePicker
            onChange={day => setSelectDate(day)}
            selected={selectDate}
            minDate={new Date(minday())}
            maxDate={new Date(maxday())}
            readOnly
            disabled
            inline
            // excludeDates={}
            dayClassName={date => (date <= subDays(minday(), 1) || date >= maxday() || isReservationDay(date) ? styles.dayDisabled : styles.day)}
        />
    );
}

export default CustomDatePicker;
