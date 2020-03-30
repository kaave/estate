import React from 'react';
import { AppProps } from 'next/app';
import { PageTransition } from 'next-page-transitions';

import 'normalize.css';
import '@styles/index.scss';

const App = ({ Component, pageProps, router }: AppProps) => (
  <PageTransition timeout={300} classNames="page-transition">
    <Component key={router.asPath} {...pageProps} />
  </PageTransition>
);

export default App;
