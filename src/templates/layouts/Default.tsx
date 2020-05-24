import React, { memo, useMemo } from 'react';
import type { ReactNode } from 'react';

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
  children?: ReactNode;
};

export const Layout = memo(
  ({
    appendTitles = [],
    description: rawDescription = configs.description,
    descriptionArgv,
    path,
    children,
  }: Props) => {
    const title = useMemo(() => [...appendTitles, configs.title].join(' | '), [appendTitles]);
    const description = descriptionArgv ? formatString(configs.descriptionTemplate, descriptionArgv) : rawDescription;

    return (
      <ErrorBoundary>
        <Head title={title} description={description} url={`${configs.baseUrl}${path ?? ''}`} />
        <div className={styles.Inner}>
          <header id="header" className={styles.Header}>
            Header
          </header>
          <main id="main" className={styles.Main} role="main">
            {children}
          </main>
        </div>
      </ErrorBoundary>
    );
  },
);
