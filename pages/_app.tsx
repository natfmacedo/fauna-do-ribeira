import React from "react";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import { Layout } from "@components/Layout";
import "@ui/theme/styles.css";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <DefaultSeo
                title="Catálogo | Fauna do Ribeira"
                description="Catálogo de animais pertencentes à fauna nativa da região do Vale do Ribeira no Estado de São Paulo."
            />
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}
