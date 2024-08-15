import React from "react";
import { ReactNode } from "react";
import { Button } from "react-aria-components";

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <header>
                <a href=""></a>
                <img />
                <h1>Fauna do Ribeira</h1>
            </header>
            {children}
            <footer>
                <h5>Fauna do Ribeira</h5>
            </footer>
        </>
    );
};
