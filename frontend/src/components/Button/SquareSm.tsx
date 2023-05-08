import { backgroundColor, txtColor } from './color';
import { AiTwotoneAlert } from 'react-icons/ai';

// 신고버튼입니다.
function SquareSm({ bgColor, textColor, innerValue, className, onClick }: ButtonProps) {
    return (
        <button
            className={`flex justify-center items-center text-center rounded-[0.31rem] px-[0.5rem] h-[1.8rem] font-bold text-[1rem] ${backgroundColor[bgColor]} ${txtColor[textColor]} ${className}`}
            type="button"
            onClick={onClick}
        >
            <AiTwotoneAlert size={20} className="" />
            {innerValue}
        </button>
    );
}

export default SquareSm;
