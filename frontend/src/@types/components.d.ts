interface ButtonProps {
    bgColor?: 'red' | 'black' | 'blue' | 'white' | 'lightgray' | 'orange' | 'darkgray' | 'sky';
    textColor?: 'white' | 'black' | 'blue';
    innerValue?: string;
    className?: string;
    isActive?: boolean;
    onClick?: () => void;
}
