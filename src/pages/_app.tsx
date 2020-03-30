import React from 'react';
import AppParentComponent, { AppContext } from 'next/app';
import { PageTransition } from 'next-page-transitions';

import 'normalize.css';
import '@styles/index.scss';

type Props = {};
type State = {};

class App extends AppParentComponent<Props, {}, State> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    return {
      pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {},
    };
  }

  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <PageTransition timeout={300} classNames="page-transition">
        <Component key={router.asPath} {...pageProps} />
      </PageTransition>
    );
  }
}

export default App;
