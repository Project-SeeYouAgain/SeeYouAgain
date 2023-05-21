interface ButtonProps {
    bgColor?: 'red' | 'black' | 'blue' | 'white' | 'lightgrey' | 'orange' | 'darkgrey' | 'sky';
    textColor?: 'white' | 'black' | 'blue';
    innerValue?: string;
    className?: string;
    isActive?: boolean;
    onClick?: () => void;
}
