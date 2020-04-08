import React from 'react';
import Link from 'next/link';

import omoriImage from '@images/omori_futan_woman.png';
import unsplashImage from '@images/sai-de-silva-4-gFGb12hFA-unsplash.jpg';
import { Layout } from '@layouts/Default';

type Props = { pathname: string };

export const SecondPageTemplate = ({ pathname }: Props) => (
  <Layout appendTitles={['セカンドページ']} description="セカンドページ" path={pathname}>
    <h1>Hello, World!</h1>
    <img src={unsplashImage} alt="" />
    <img src={omoriImage} alt="" />
    <Link href="/">
      <a>Goto Root</a>
    </Link>
  </Layout>
);
