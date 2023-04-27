import { backgroundColor, txtColor } from './color';

function RoundSm({ bgColor, textColor, innerValue, onClick }: ButtonProps) {
    return (
        <button
            className={` flex justify-center items-center text-center rounded-[0.62rem] w-[18.75rem] h-[3.06rem] font-bold text-[1.5rem] ${backgroundColor[bgColor]} ${txtColor[textColor]}`}
            type="button"
            onClick={onClick}
        >
            {innerValue}
        </button>
    );
}

export default RoundSm;
