import React from 'react';
import { AppProps } from 'next/app';
import Router from 'next/router';
import { PageTransition } from 'next-page-transitions';

import { pageView } from '@utils/gtag';
import * as configs from '@utils/configs';

import 'normalize.css';
import '@styles/index.scss';

if (configs.googleAnalytics) {
  Router.events.on('routeChangeComplete', (url: string) => pageView(url));
}

const App = ({ Component, pageProps, router }: AppProps) => (
  <PageTransition timeout={300} classNames="page-transition">
    <Component key={router.asPath} {...pageProps} />
  </PageTransition>
);

export default App;
