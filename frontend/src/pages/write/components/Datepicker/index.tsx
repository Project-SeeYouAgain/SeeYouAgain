import { useState } from 'react';

interface DateCellProps {
    day: Date;
    isSelected: boolean;
    isStartSelected: boolean;
    isEndSelected: boolean;
    isToday: boolean;
}

function DateCell({ day, isSelected, isStartSelected, isEndSelected, isToday }: DateCellProps) {
    const tdClasses = [isSelected ? 'bg-blue-500 text-blue' : '', isStartSelected ? 'rounded-l-full' : '', isEndSelected ? 'rounded-r-full' : '', isToday ? 'bg-gray-100' : ''];

    return <td className={tdClasses.join(' ')}>{day.getDate()}</td>;
}

function DatePicker() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputStartDate = new Date(event.target.value);
        setStartDate(inputStartDate);
    };

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputEndDate = new Date(event.target.value);
        setEndDate(inputEndDate);
    };

    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

    const getDaysInMonth = (year: number, month: number) => {
        const date = new Date(year, month, 1);
        const days = [];

        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

        return days;
    };

    const getCalendar = (year: number, month: number) => {
        const days = getDaysInMonth(year, month);
        const calendar: Date[][] = [];

        let week: Date[] = [];
        for (let i = 0; i < days.length; i++) {
            if (i > 0 && days[i].getDay() === 0) {
                calendar.push(week);
                week = [];
            }
            week.push(days[i]);
        }
        calendar.push(week);

        return calendar;
    };

    const calendar = getCalendar(startDate?.getFullYear() ?? new Date().getFullYear(), startDate?.getMonth() ?? new Date().getMonth());

    return (
        <div>
            <div className="flex">
                <div>
                    <label htmlFor="start-date">시작일 </label>
                    <br />
                    <input type="date" id="start-date" name="start-date" data-placeholder="날짜 선택" value={startDate?.toISOString().slice(0, 10) ?? ''} onChange={handleStartDateChange} />
                </div>
                <div>
                    <label htmlFor="end-date">종료일 </label>
                    <br />
                    <input type="date" id="end-date" name="end-date" data-placeholder="날짜 선택" value={endDate?.toISOString().slice(0, 10) ?? ''} onChange={handleEndDateChange} />
                </div>
            </div>

            <div>
                <table>
                    <thead>
                        <tr>
                            {daysOfWeek.map(dayOfWeek => (
                                <th key={dayOfWeek}>{dayOfWeek}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {calendar.map((week, weekIndex) => (
                            <tr key={weekIndex}>
                                {week.map((day, dayIndex) => {
                                    const isSelected = startDate && endDate && day >= startDate && day <= endDate;
                                    const isStartSelected = isSelected && day.getTime() === startDate.getTime();

                                    const isEndSelected = isSelected && day.getTime() === endDate.getTime();

                                    const isToday = day.toDateString() === new Date().toDateString();

                                    return <DateCell key={dayIndex} day={day} isSelected={isSelected} isStartSelected={isStartSelected} isEndSelected={isEndSelected} isToday={isToday} />;
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default DatePicker;
