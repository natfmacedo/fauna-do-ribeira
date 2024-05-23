import React from "react";
import { ReactNode } from "react";

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
        </>
    );
};
