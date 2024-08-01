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
                <p>
                    Se interessou pelo projeto e gostaria de ser um(a)
                    colaborador(a)?
                </p>
                <Button aria-describedby="contactDescription">
                    Clique aqui para entrar em contato
                </Button>
                <p id="contactDescription">
                    Abre a janela do aplicativo de e-mail com o destinatário
                    (e-mail do projeto) já preenchido.
                </p>
            </footer>
        </>
    );
};
