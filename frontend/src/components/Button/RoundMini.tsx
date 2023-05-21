import { backgroundColor, txtColor } from './color';

function RoundMini({ bgColor, textColor, innerValue, onClick }: ButtonProps) {
    return (
        <button
            className={` flex justify-center items-center text-center rounded-[50rem] w-[5.5rem] h-[1.8rem] font-bold text-[0.8rem] bg-${bgColor} text-${textColor}`}
            type="button"
            onClick={onClick}
        >
            {innerValue}
        </button>
    );
}

export default RoundMini;
