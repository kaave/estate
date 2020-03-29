import React from 'react';
// import App, { AppContext } from 'next/app';
import App from 'next/app';

// import '~/styles/_global.scss?raw';

type Props = {};
type State = {};

class ModifiedApp extends App<Props, State> {
  // static async getInitialProps({ Component, ctx }: AppContext) {
  //   let pageProps = {};

  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx);
  //   }

  //   return { pageProps };
  // }

  render() {
    const { Component, pageProps, router } = this.props;

    return <Component {...pageProps} key={router.route} />;
  }
}

export default ModifiedApp;
