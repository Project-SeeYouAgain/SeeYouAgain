import styled, { css } from 'styled-components';

export interface ButtonLayoutProps {
    buttonType: 'ghost' | 'default' | 'LargeSubmit' | 'MiddleModal' | 'Cate1' | 'Cate2' | 'Cate3';
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
    width: 22rem;
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
export const Cate1ButtonStyles = css`
    color: #ffffff;
    font-family: 'Pretendard-Bold';
    font-size: 0.68rem;
    text-align: center;
    align-items: center;
    width: 7.44rem;
    height: 1.87rem;
    border-radius: 50rem;
`;
export const Cate2ButtonStyles = css`
    color: #ffffff;
    font-family: 'Pretendard-Bold';
    font-size: 0.68rem;
    text-align: center;
    align-items: center;
    width: 5.5rem;
    height: 1.87rem;
    border-radius: 50rem;
`;
export const Cate3ButtonStyles = css`
    color: #ffffff;
    font-family: 'Pretendard-Bold';
    font-size: 0.68rem;
    text-align: center;
    align-items: center;
    width: 3.25rem;
    height: 1.87rem;
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
            case 'Cate1':
                return Cate1ButtonStyles;
            case 'Cate2':
                return Cate2ButtonStyles;
            case 'Cate3':
                return Cate3ButtonStyles;
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
