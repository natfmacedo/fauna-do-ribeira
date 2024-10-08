import React from "react";
import { ReactNode } from "react";
import { Button } from "react-aria-components";

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <header className="header">
                {/* <a href=""></a>
                <img /> */}
                <h1 className="header__title">
                    Fauna do <br aria-hidden="true" />
                    <span className="header__title--emphasis">Ribeira</span>
                </h1>
            </header>
            {children}

            <footer className="footer">
                <p className="footer__logo">
                    Fauna do <br />
                    <span className="footer__logo--emphasis">Ribeira</span>
                </p>
            </footer>
        </>
    );
};
