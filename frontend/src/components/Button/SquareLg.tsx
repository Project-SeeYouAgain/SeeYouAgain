import { backgroundColor, txtColor } from './color';

type ButtonProps = {
    check?: boolean;
    bgColor: keyof typeof backgroundColor;
    textColor: keyof typeof txtColor;
    innerValue: React.ReactNode;
    className?: string;
    onClick?: () => void;
};

function RoundSm({ check = true, bgColor, textColor, innerValue, className = '', onClick }: ButtonProps) {
    return (
        <div>
            {check && (
                <button
                    className={`flex justify-center items-center rounded-[0.62rem] w-[100%] h-[3.06rem] font-bold text-xl ${backgroundColor[bgColor]} ${txtColor[textColor]} ${className}`}
                    type="button"
                    onClick={onClick}
                >
                    {innerValue}
                </button>
            )}
            {!check && (
                <button
                    className={`flex justify-center items-center rounded-[0.62rem] w-[100%] h-[3.06rem] font-bold text-xl bg-gray-300 ${txtColor[textColor]} ${className}`}
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
