import React from "react";
import type { AppProps } from "next/app";
import { Layout } from "@components/Layout";
import "@ui/theme/styles.css";
import Head from "next/head";
import { DefaultSeo } from "next-seo";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <DefaultSeo
                title="Catálogo | Fauna do Ribeira"
                description="Catálogo de animais pertencentes à fauna nativa da região do Vale do Ribeira no Estado de São Paulo."
            />
            <Component {...pageProps} />
            {/* <Head>
                <title>Catálogo | Fauna do Ribeira</title>
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout> */}
        </>
    );
}
