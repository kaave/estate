import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Router from 'next/router';
import FontFaceObserver from 'fontfaceobserver';
import type { AppProps } from 'next/app';

import { pageView } from '@utils/gtag';
import { crawlerAccess } from '@utils/crawlers';
import * as configs from '@utils/configs';

import '@styles/index.scss';
import Head from 'next/head';

if (configs.googleAnalytics) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  Router.events.on('routeChangeComplete', (url: string) => pageView(url));
}

type Props = AppProps & {
  Component: AppProps['Component'] & {
    onInit?: () => Promise<unknown>;
  };
};

const App = ({ Component, pageProps, router }: Props) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [fontInitialized, setFontInitialized] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      const ffo = new FontFaceObserver('Crimson Text');
      await ffo.load();
      setFontInitialized(true);
    })();
  }, []);

  const visible = crawlerAccess || !fontInitialized;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <SwitchTransition>
        <CSSTransition key={router.asPath} nodeRef={nodeRef} timeout={300} classNames="page-transition">
          <div ref={nodeRef} className="wrapper" hidden={visible || undefined}>
            <Component {...pageProps} />
          </div>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
};

export default App;
