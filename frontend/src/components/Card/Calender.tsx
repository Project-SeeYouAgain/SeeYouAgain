import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ reservationPeriods, availablePeriod }) => {
    const isReserved = (date: Date): boolean => {
        return reservationPeriods.some(period => new Date(period.startDate) <= date && date <= new Date(period.endDate));
    };

    const isAvailable = (date: Date): boolean => {
        return new Date(availablePeriod.startDate) <= date && date <= new Date(availablePeriod.endDate);
    };

    const handleDayClassName = (date: Date): string => {
        if (isReserved(date)) {
            return 'reserved-day';
        }
        if (isAvailable(date)) {
            return 'available-day';
        }
        return '';
    };

    const filterSelectableDate = (date: Date): boolean => {
        return isAvailable(date) && !isReserved(date);
    };

    const [startDate, setStartDate] = useState(null);

    return <DatePicker inline readOnly selected={new Date()} dayClassName={(date: Date) => handleDayClassName(date)} shouldCloseOnSelect={false} onChange={date => setStartDate(date)} />;
};

export default CustomDatePicker;
