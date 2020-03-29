import React from 'react';
// import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import Document, { Html, Head, Main, NextScript } from 'next/document';

import * as configs from '@utils/configs';

class ModifiedDocument extends Document {
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx);

  //   return { ...initialProps };
  // }

  render() {
    return (
      <Html lang="ja">
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <script src={`https://polyfill.io/v3/polyfill.min.js?features=${configs.polyfills}&flags=gated`} defer />
        </Head>
        <body>
          Running port at: {process.env.PORT}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default ModifiedDocument;
