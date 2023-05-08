import { backgroundColor, txtColor } from './color';

function Square({ bgColor, textColor, innerValue, className, onClick }: ButtonProps) {
    return (
        <button className={`flex justify-center items-center font-bold ${backgroundColor[bgColor]} ${txtColor[textColor]} ${className}`} type="button" onClick={onClick}>
            {innerValue}
        </button>
    );
}

export default Square;
