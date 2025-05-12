// pages/_app.tsx
import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import "@/assets/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>MedSync - Your Health, Seamlessly Connected</title>
        <meta name="description" content="Access healthcare services anytime, anywhere" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
