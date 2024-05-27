import React from "react";
import type { AppProps } from "next/app";
import { Layout } from "@components/Layout";
import "@ui/theme/styles.css";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Catálogo | Fauna do Ribeira</title>
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}
