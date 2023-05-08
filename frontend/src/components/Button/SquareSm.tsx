import { backgroundColor, txtColor } from './color';
function SquareSm({ bgColor, textColor, innerValue, className, onClick }: ButtonProps) {
    return (
        <button
            className={` flex justify-center items-center text-center rounded-[0.31rem] px-[0.8rem] h-[1.8rem] font-bold text-[1rem] bg-${bgColor} text-${textColor} ${className}`}
            type="button"
            onClick={onClick}
        >
            {innerValue}
        </button>
    );
}

export default SquareSm;
