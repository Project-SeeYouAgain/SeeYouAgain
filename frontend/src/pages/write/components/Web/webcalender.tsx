import { useEffect, useState } from 'react';
import { format, addMonths, addDays, isAfter } from 'date-fns';

type DropdownCalendarProps = {
    onChange?: (startDate: Date | null, endDate: Date | null) => void;
};

function Webcalender({ onChange }: DropdownCalendarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [tempStartDate, setTempStartDate] = useState<Date | null>(null);
    const [tempEndDate, setTempEndDate] = useState<Date | null>(null);

    useEffect(() => {
        // 오늘 날짜를 시작일로 설정
        const today = new Date();
        setStartDate(today);
        setTempStartDate(today);
    }, []);

    function toggleDropdown() {
        setIsOpen(!isOpen);
    }

    function confirmSelection() {
        setStartDate(tempStartDate);
        setEndDate(tempEndDate);
        setIsOpen(!isOpen);
    }

    function generateStartDateOptions() {
        const today = new Date();
        const futureDate = addMonths(today, 3);
        const options = [];

        let currentDate = today;
        while (isAfter(futureDate, currentDate)) {
            options.push(currentDate);
            currentDate = addDays(currentDate, 1);
        }

        return options;
    }

    function generateEndDateOptions(startDate: Date) {
        const futureDate = addMonths(startDate, 3);
        const options = [];

        let currentDate = addDays(startDate, 1);
        while (isAfter(futureDate, currentDate)) {
            options.push(currentDate);
            currentDate = addDays(currentDate, 1);
        }

        return options;
    }
    return (
        <div className="relative grid grid-cols-[1fr,3fr] mb-10 ">
            <p className="mb-[1.2rem] font-bold text-[1.2rem] "> 대여일정 </p>
            <div>
                <button
                    className="flex items-center justify-center px-4 py-2 text-[1rem] font-NanumNeo font-bold text-blue bg-lightgrey rounded-md  focus:outline-none hover:bg-blue hover:text-white"
                    onClick={toggleDropdown}
                >
                    {startDate && endDate ? ` ${format(startDate, 'yyyy-MM-dd')}  ~  ${format(endDate, 'yyyy-MM-dd')}` : '날짜 선택'}
                </button>

                {isOpen && (
                    <div className="absolute  right-0 p-2 -top-3 bg-white rounded-[1rem]" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', opacity: 1 }}>
                        <div className="flex w-[30vw] justify-between">
                            <div className="w-2/3 pr-1">
                                <label className="block mb-1 text-sm font-semibold text-gray-700">시작일</label>
                                <select
                                    className="w-full px-2 py-1 border rounded focus:outline-none"
                                    value={tempStartDate ? format(tempStartDate, 'yyyy-MM-dd') : ''}
                                    onChange={e => setTempStartDate(new Date(e.target.value))}
                                >
                                    <option value="">선택</option>
                                    {generateStartDateOptions().map(date => (
                                        <option key={date.toString()} value={format(date, 'yyyy-MM-dd')}>
                                            {format(date, 'yyyy-MM-dd')}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-2/3 pl-1">
                                <label className="block mb-1 text-sm font-semibold text-gray-700">종료일</label>
                                <select
                                    className="w-full px-2 py-1 border rounded focus:outline-none"
                                    value={tempEndDate ? format(tempEndDate, 'yyyy-MM-dd') : ''}
                                    onChange={e => setTempEndDate(new Date(e.target.value))}
                                >
                                    <option value="">선택</option>
                                    {tempStartDate &&
                                        generateEndDateOptions(tempStartDate).map(date => (
                                            <option key={date.toString()} value={format(date, 'yyyy-MM-dd')}>
                                                {format(date, 'yyyy-MM-dd')}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                        <button className="block mt-2 px-4  py-2 text-sm text-white bg-blue  hover:bg-blue-dark rounded-[1rem] focus:outline-none" onClick={confirmSelection}>
                            확인
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Webcalender;
