import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import { PageTransition } from 'next-page-transitions';
import FontFaceObserver from 'fontfaceobserver';

import { pageView } from '@utils/gtag';
import * as configs from '@utils/configs';

import '@styles/index.scss';

if (configs.googleAnalytics) {
  Router.events.on('routeChangeComplete', (url: string) => pageView(url));
}

const App = ({ Component, pageProps, router }: AppProps) => {
  useEffect(() => {
    const fn = async () => {
      const ffo = new FontFaceObserver('Crimson Text');
      const start = performance.now();
      await ffo.load();
      console.log('loaded Crimson Text', performance.now() - start);
    };
    fn();
  }, []);
  return (
    <PageTransition timeout={300} classNames="page-transition">
      <Component key={router.asPath} {...pageProps} />
    </PageTransition>
  );
};

export default App;
