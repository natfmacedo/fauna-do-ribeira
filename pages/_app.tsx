import React from "react";
import type { AppProps } from "next/app";
import { Layout } from "@components/Layout";
import "@ui/theme/styles.css";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}
