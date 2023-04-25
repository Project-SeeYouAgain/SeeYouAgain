import styled, { css } from 'styled-components';

export interface ButtonLayoutProps {
    buttonType: 'ghost' | 'default' | 'LargeSubmit' | 'MiddleModal';
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

export const LargeSubmitButtonStyles = css`
    background: #5669ff;
    color: #ffffff;
    font-family: 'Pretendard-Bold';
    font-size: 1.25rem;
    text-align: center;
    align-items: center;
    width: 18.75rem;
    height: 3.06rem;
    border-radius: 5px;
`;
export const MiddleModalButtonStyles = css`
    color: #ffffff;
    font-family: 'Pretendard-Bold';
    font-size: 0.68rem;
    text-align: center;
    align-items: center;
    width: 3.42rem;
    height: 1.12rem;
    border-radius: 50rem;
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
    border: none;
    background: #f2f2f2;

    ${({ buttonType }) => {
        switch (buttonType) {
            case 'LargeSubmit':
                return LargeSubmitButtonStyles;
            case 'MiddleModal':
                return MiddleModalButtonStyles;
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
