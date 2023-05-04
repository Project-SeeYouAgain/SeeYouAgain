import { backgroundColor, txtColor } from './color';
import { IoMdBatteryCharging } from 'react-icons/io';

function MannerPoint({ innerValue, className }: ButtonProps) {
    return (
        <button className={` flex justify-center whitespace-nowrap items-center rounded-[.5rem] px-[0.6rem] h-[1.8rem] font-bold bg-sky text-blue ${className}`} type="button">
            <div className="flex items-center">
                <p className='text-sm me-1'>{innerValue}%</p>
                <IoMdBatteryCharging className="text-blue text-[1rem] pb-1 box-content"></IoMdBatteryCharging>
            </div>
        </button>
    );
}

export default MannerPoint;
