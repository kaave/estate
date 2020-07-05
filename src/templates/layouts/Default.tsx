import React, { useMemo, useCallback, useState } from 'react';
import type { ReactNode } from 'react';

import * as configs from '@utils/configs';
import { Head } from '@components/utils/Head';
import { ErrorBoundary } from '@components/utils/ErrorBoundary';
import { formatString } from '@utils/formatString';
import { GlobalHeader } from '@components/shared/GlobalHeader';
import styles from './default.module.scss';

type Props = {
  appendTitles?: string[];
  description?: string;
  descriptionArgv?: string;
  path?: string;
  children?: ReactNode;
};

export const Layout = ({
  appendTitles = [],
  description: rawDescription = configs.description,
  descriptionArgv,
  path,
  children,
}: Props) => {
  const title = useMemo(() => [...appendTitles, configs.title].join(' | '), [appendTitles]);
  const description = useMemo(
    () => (descriptionArgv ? formatString(configs.descriptionTemplate, descriptionArgv) : rawDescription),
    [descriptionArgv, rawDescription],
  );
  const [visibleModalMenu, setVisibleModalMenu] = useState(false);
  const handleClickHamburger = useCallback(() => setVisibleModalMenu((b) => !b), []);

  return (
    <ErrorBoundary>
      <Head title={title} description={description} url={`${configs.baseUrl}${path ?? ''}`} />
      <div className={styles.Inner}>
        <GlobalHeader visibleModal={visibleModalMenu} onClickHamburger={handleClickHamburger} />
        <main id="main" className={styles.Main} role="main">
          {children}
        </main>
      </div>
    </ErrorBoundary>
  );
};
