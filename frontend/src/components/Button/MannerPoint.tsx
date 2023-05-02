import { backgroundColor, txtColor } from './color';
import { IoMdBatteryCharging } from 'react-icons/io';

function MannerPoint({ innerValue, className }: ButtonProps) {
    return (
        <button className={` flex justify-center whitespace-nowrap items-center rounded-[.5rem] px-[0.6rem] h-[1.8rem] font-bold bg-sky text-blue ${className}`} type="button">
            <div className="flex items-center">
                {innerValue}%<IoMdBatteryCharging className="text-blue text-[1rem]"></IoMdBatteryCharging>
            </div>
        </button>
    );
}

export default MannerPoint;
