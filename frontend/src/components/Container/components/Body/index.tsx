import React, { forwardRef, RefObject } from 'react';
import classNames from 'classnames';

interface BodyProps {
    className?: string;
    children?: React.ReactNode;
}

const Body = forwardRef<HTMLDivElement, BodyProps>(({ className, children }, ref) => {
    return (
        <div ref={ref} id="container" className={classNames(className, 'px-[1.88rem]')}>
            {children}
        </div>
    );
});

export default Body;
