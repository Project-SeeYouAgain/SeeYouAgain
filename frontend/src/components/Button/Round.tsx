import { backgroundColor, txtColor } from './color';

function Round({ bgColor, textColor, innerValue, className, onClick }: ButtonProps) {
    return (
        <button
            className={` flex justify-center whitespace-nowrap items-center rounded-full px-[0.8rem] h-[1.8rem] font-bold text-[0.8rem] ${backgroundColor[bgColor]} ${txtColor[textColor]} ${className}`}
            type="button"
            onClick={onClick}
        >
            {innerValue}
        </button>
    );
}

export default Round;
