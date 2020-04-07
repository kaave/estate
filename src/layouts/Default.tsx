import React from 'react';

import * as configs from '@utils/configs';
import { Head } from '@components/shared/Head';
import { ErrorBoundary } from '@components/shared/ErrorBoundary';
import { formatString } from '@utils/formatString';
import styles from './default.module.scss';

type Props = {
  appendTitles?: string[];
  description?: string;
  descriptionArgv?: string;
  path?: string;
  children?: React.ReactNode;
};

export const Layout = React.memo(
  ({
    appendTitles = [],
    description: rawDescription = configs.description,
    descriptionArgv,
    path,
    children,
  }: Props) => {
    const title = React.useMemo(() => [...appendTitles, configs.title].join(' | '), [appendTitles]);
    const description = descriptionArgv ? formatString(configs.descriptionTemplate, descriptionArgv) : rawDescription;

    return (
      <ErrorBoundary>
        <Head title={title} description={description} url={`${configs.baseUrl}${path ?? ''}`} />
        <div className={styles.Inner}>
          <header id="header" className={styles.Header} role="banner">
            Header
          </header>
          <main id="main" className={styles.Main} role="main">
            {children}
          </main>
          <footer id="footer" className={styles.Footer}>
            Footer
          </footer>
        </div>
      </ErrorBoundary>
    );
  },
);
