import { backgroundColor, txtColor } from './color';

function RoundSm({ bgColor, textColor, innerValue, className, onClick }: ButtonProps) {
    return (
        <button
            className={` flex justify-center items-center rounded-[0.62rem] w-[100%] h-[3.06rem] font-bold text-[1.5rem] ${backgroundColor[bgColor]} ${txtColor[textColor]} ${className}`}
            type="button"
            onClick={onClick}
        >
            {innerValue}
        </button>
    );
}

export default RoundSm;
