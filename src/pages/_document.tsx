import React from "react";
import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="pt-br">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      </Head>
      <body className="bg-neutral-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
