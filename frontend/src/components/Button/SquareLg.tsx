import { backgroundColor, txtColor } from './color';

type ButtonProps = {
    check?: boolean;
    bgColor: keyof typeof backgroundColor;
    textColor: keyof typeof txtColor;
    innerValue: React.ReactNode;
    className?: string;
    divClass?: string;
    onClick?: () => void;
};

function RoundSm({ check = true, bgColor, textColor, innerValue, divClass = '', className = '', onClick }: ButtonProps) {
    return (
        <div className={`${divClass}`}>
            {check && (
                <button
                    className={`flex justify-center items-center rounded-[0.62rem] w-full h-[3.06rem] font-bold text-xl bg-${bgColor} text-${textColor} ${className}`}
                    type="button"
                    onClick={onClick}
                >
                    {innerValue}
                </button>
            )}
            {!check && (
                <button
                    className={`flex justify-center items-center rounded-[0.62rem] w-[100%] h-[3.06rem] font-bold text-xl bg-gray-300 text-${textColor} ${className}`}
                    type="button"
                    onClick={onClick}
                    disabled
                >
                    {innerValue}
                </button>
            )}
        </div>
    );
}

export default RoundSm;
