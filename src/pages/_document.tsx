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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#4338ca" />
        <meta name="msapplication-TileColor" content="#4338ca" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="author" content="@rafaelsilva81" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* SEO meta tags */}
      </Head>
      <body className="bg-neutral-200 text-gray-800 ">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
