import React, { FunctionComponent, HTMLProps } from 'react';
import { ButtonLayout, ButtonLayoutProps } from './styles';

export interface ButtonProps extends HTMLProps<HTMLButtonElement>, ButtonLayoutProps {}

const Button: FunctionComponent<ButtonProps> = ({ children, buttonType }) => {
    return (
        <ButtonLayout type="button" buttonType={buttonType}>
            {children}
        </ButtonLayout>
    );
};

export default Button;
