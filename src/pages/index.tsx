import React from 'react';
import Link from 'next/link';

import omoriImage from '@images/omori_futan_woman.png';
import unsplashImage from '@images/sai-de-silva-4-gFGb12hFA-unsplash.jpg';
import styles from './index.module.scss';

const HomePage = () => (
  <div>
    <h1 className={styles.header}>Hello, World!</h1>
    <img src={omoriImage} alt="" />
    <img src={unsplashImage} alt="" />
    <Link href="/second-page">
      <button type="button">Goto Second Page</button>
    </Link>
  </div>
);

export default HomePage;
