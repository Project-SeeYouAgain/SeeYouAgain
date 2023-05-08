import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { subDays, addDays } from 'date-fns';

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
    const isReserved = (date: Date): boolean => {
        return reservationPeriods.some(period => new Date(period.startDate) <= date && date <= new Date(period.endDate));
    };

    const isAvailable = (date: Date): boolean => {
        return new Date(availablePeriod.startDate) <= date && date <= new Date(availablePeriod.endDate);
    };

    const [startDate, setStartDate] = useState(null);

    const minday = () => {
        return new Date(availablePeriod.startDate) <= new Date() ? new Date(availablePeriod.startDate) : new Date();
    };

    const maxday = () => {
        return new Date(availablePeriod.endDate);
    };

    const reservationdays = reservationPeriods.map(period => ({
        start: new Date(period.startDate),
        end: new Date(period.endDate),
    }));

    return (
        <DatePicker
            onChange={() => setStartDate(null)}
            onSelect={() => {
                null;
            }}
            excludeDateIntervals={reservationdays}
            minDate={new Date(minday())}
            maxDate={new Date(maxday())}
            readOnly
            inline
            disabled
        />
    );
}

export default CustomDatePicker;
