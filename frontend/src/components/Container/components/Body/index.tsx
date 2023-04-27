import React, { forwardRef, RefObject } from 'react';

interface BodyProps {
    className?: string;
    children?: React.ReactNode;
}

const Body = forwardRef<HTMLDivElement, BodyProps>(({ className, children }, ref) => {
    return (
        <div ref={ref} id="container" className={className}>
            {children}
        </div>
    );
});

export default Body;
