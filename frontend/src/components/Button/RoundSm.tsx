import { backgroundColor, txtColor } from './color';

function RoundSm({ bgColor, textColor, innerValue, onClick }: ButtonProps) {
    return (
        <button
            className={` flex justify-center items-center text-center rounded-[50rem] w-[3.25rem] h-[1.87rem] font-bold text-[0.8rem] bg-${bgColor} text-${textColor}`}
            type="button"
            onClick={onClick}
        >
            {innerValue}
        </button>
    );
}

export default RoundSm;
