import React from 'react';
import styles from './main.module.scss';
import classNames from 'classnames';
import Web from '../components/main/Web/index';
import Mobile from '../components/main/Mobile/index';
import { useWindowSize } from '../components/hooks/useWindowSize';

export default function index() {
    const { width } = useWindowSize();
    const isMobile = width && width <= 768;
    return <div>{isMobile ? <Mobile /> : <Web />}</div>;
}
