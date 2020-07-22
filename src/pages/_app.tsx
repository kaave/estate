import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Router from 'next/router';
import FontFaceObserver from 'fontfaceobserver';
import type { AppProps } from 'next/app';

import { pageView } from '@utils/gtag';
import { crawlerAccess } from '@utils/crawlers';
import * as configs from '@utils/configs';

import '@styles/index.scss';

if (configs.googleAnalytics) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  Router.events.on('routeChangeComplete', (url: string) => pageView(url));
}

const App = ({ Component, pageProps, router }: AppProps) => {
  const nodeRef = useRef(null);
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
    <SwitchTransition>
      <CSSTransition
        key={router.asPath}
        nodeRef={nodeRef}
        timeout={300}
        classNames="page-transition"
        // addEndListener={(c, cb) => console.log(c, cb)}
      >
        <div ref={nodeRef} className="wrapper" hidden={visible || undefined}>
          <Component {...pageProps} />
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default App;
