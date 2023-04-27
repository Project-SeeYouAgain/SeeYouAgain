import React, { ReactNode } from 'react';
import Body from './components/Body';

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

function Container({ children, className }: ContainerProps) {
    return (
        <div id="container" className={className}>
            {children}
        </div>
    );
}

Container.Body = Body;

export default Container;
