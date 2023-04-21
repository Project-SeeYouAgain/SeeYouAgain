import styled, { css } from 'styled-components';

export interface ButtonLayoutProps {
    buttonType: 'ghost' | 'default';
}

export const defaultButtonStyles = css`
    background: #5669ff;
    color: #ffffff;

    &:hover {
        background: #afb8ff;
    }

    &:active {
        background: #afb8ff;
    }
`;

export const ghostButtonStyles = css`
    background: transparent;
    color: #5669ff;
    border: 2px solid #5669ff;

    &:hover {
        background: #5669ff;
        color: #fff;
    }

    &:active {
        background: #5669ff;
    }
`;

export const ButtonLayout = styled.button<ButtonLayoutProps>`
    padding: 10px 30px;
    border: none;
    border-radius: 10px;
    width: 100%;
    ${({ buttonType }) => {
        switch (buttonType) {
            case 'ghost':
                return ghostButtonStyles;
            case 'default':
                return defaultButtonStyles;
            default:
                return defaultButtonStyles;
        }
    }}
`;

export default {
    ButtonLayout,
};
