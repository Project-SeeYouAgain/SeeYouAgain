import React, { FunctionComponent, HTMLProps } from 'react';
import { ButtonLayout, ButtonLayoutProps } from './styles';

export interface ButtonProps extends HTMLProps<HTMLButtonElement>, ButtonLayoutProps {}

const Button: FunctionComponent<ButtonProps> = ({ children, buttonType, onclick }) => {
    return (
        <ButtonLayout type="button" buttonType={buttonType} onclick={onclick}>
            {children}
        </ButtonLayout>
    );
};

export default Button;
