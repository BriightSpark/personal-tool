import React from 'react';
import Document, { Html, Head, Main, NextScript } from '../../node_modules/next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          { /* <!-- Global site tag (gtag.js) - Google Analytics --> */ }
          <script async src={ `https://www.googletagmanager.com/gtag/js?id=${ process.env.NEXT_PUBLIC_GOOGLE_TAG }` } />
          <script id='google-analytics'
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${ process.env.NEXT_PUBLIC_GOOGLE_TAG }', {
                  page_path: window.location.pathname,
                });
              `
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
