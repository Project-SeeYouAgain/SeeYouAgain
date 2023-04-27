import React from 'react';
import { Story } from '@storybook/react';
import Button, { ButtonProps } from '.';

export default {
    title: 'Atoms/Button',
    component: Button,
};

const Template: Story<ButtonProps> = args => <Button {...args} />;

export const Default = Template.bind({});

Default.args = {
    buttonType: 'default',
    children: '예은 바보',
};

export const Ghost = Template.bind({});

Ghost.args = {
    buttonType: 'ghost',
    children: '예은 바보 아니다',
};

export const LargeSubmit = Template.bind({});

LargeSubmit.args = {
    buttonType: 'LargeSubmit',
    children: '아아',
};

export const MiddleModal = Template.bind({});

MiddleModal.args = {
    buttonType: 'MiddleModal',
    color: 'blue',
    children: '대여일정',
};

export const MiddleModalRed = Template.bind({});

MiddleModalRed.args = {
    buttonType: 'MiddleModalRed',
    color: 'blue',
    children: '대여일정',
};

export const MiddleModalOrange = Template.bind({});

MiddleModalOrange.args = {
    buttonType: 'MiddleModalOrange',
    color: 'blue',
    children: '대여일정',
};

export const Cate1 = Template.bind({});

Cate1.args = {
    buttonType: 'Cate1',
    children: '도서',
};

export const Cate2 = Template.bind({});

Cate2.args = {
    buttonType: 'Cate2',
    children: '여성잡화',
};

export const Cate3 = Template.bind({});

Cate3.args = {
    buttonType: 'Cate3',
    children: '가구/인테리어',
};
