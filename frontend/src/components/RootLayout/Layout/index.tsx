import React, { Fragment, ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = props => {
    return (
        <Fragment>
            <main>{props.children}</main>
        </Fragment>
    );
};

export default Layout;
