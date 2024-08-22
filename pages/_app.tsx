import React from "react";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import { Layout } from "@components/Layout";
import "@ui/theme/styles.css";
import "@ui/theme/styles-admin.css";
import "@ui/theme/styles-create-update.css";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <DefaultSeo
                title="Animais | Fauna do Ribeira"
                description="Catálogo de animais pertencentes à fauna nativa da região do Vale do Ribeira no Estado de São Paulo."
            />
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}
