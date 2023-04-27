interface ButtonProps {
    bgColor: 'red' | 'black' | 'white' | 'blue' | 'lightgray' | 'orange' | 'darkgray';
    textColor: 'white' | 'black';
    innerValue: string;
    onClick?: () => void;
}
