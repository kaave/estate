import React from 'react';

import { Layout } from '@layouts/Default';
import { RouteHeader } from '@components/shared/RouteHeader';
import { SectionHeader } from '@components/shared/SectionHeader';

import styles from './index.module.scss';

type Props = {
  pathname: string;
};

export const AboutTemplate = ({ pathname }: Props) => (
  <Layout appendTitles={['ABOUT']} descriptionArgv="概要" path={pathname}>
    <div className={styles.inner}>
      <RouteHeader lineCount={16}>About</RouteHeader>
      <p className={styles.desc}>うんたらかんたら</p>
      <SectionHeader>Skills</SectionHeader>
      <p className={styles.desc}>うんたらかんたら</p>
      <SectionHeader>Likes</SectionHeader>
      <p className={styles.desc}>うんたらかんたら</p>
    </div>
  </Layout>
);
