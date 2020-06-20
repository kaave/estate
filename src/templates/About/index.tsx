import React from 'react';

import { Layout } from '@layouts/Default';
import { RouteHeader } from '@components/shared/RouteHeader';

import styles from './index.module.scss';

type Props = {
  pathname: string;
};

export const AboutTemplate = ({ pathname }: Props) => (
  <Layout appendTitles={['ABOUT']} descriptionArgv="概要" path={pathname}>
    <div className={styles.inner}>
      <RouteHeader hidden lineCount={16}>
        About
      </RouteHeader>
      <p className={styles.desc}>うんたらかんたら</p>
      <RouteHeader hidden lineCount={16} pattern={2}>
        Skills
      </RouteHeader>
      <p className={styles.desc}>うんたらかんたら</p>
      <RouteHeader hidden lineCount={16} pattern={3}>
        Likes
      </RouteHeader>
      <p className={styles.desc}>うんたらかんたら</p>
    </div>
  </Layout>
);
