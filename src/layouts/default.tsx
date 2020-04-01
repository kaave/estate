import React from 'react';

import * as configs from '@utils/configs';
import { Head } from '@components/shared/Head';
import styles from './default.module.scss';

type Props = {
  appendTitles?: string[];
  description?: string;
  children?: React.ReactNode;
};

export const Layout = React.memo(({ appendTitles = [], description = configs.description, children }: Props) => {
  const title = React.useMemo(() => [...appendTitles, configs.title].join(' | '), [appendTitles]);

  return (
    <>
      <Head title={title} description={description} />
      <header id="header" className="Header" role="banner">
        Header
      </header>
      <main id="main" className={styles.Main} role="main">
        {children}
      </main>
      <footer id="footer" className="Footer">
        Footer
      </footer>
    </>
  );
});
